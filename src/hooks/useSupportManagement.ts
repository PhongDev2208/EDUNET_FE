// Support Ticket Management Hook
import { useState, useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';
import type { AdminSupportTicket, TicketResponse, TableParams } from '../types/admin';
import { supportTickets as mockTickets, currentAdminUser } from '../constants/adminData';

interface TicketFilters {
  status?: string;
  category?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
}

export const useSupportManagement = () => {
  const [tickets, setTickets] = useState<AdminSupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<AdminSupportTicket | null>(null);
  const [filters, setFilters] = useState<TicketFilters>({});
  const [tableParams, setTableParams] = useState<TableParams>({
    page: 1,
    pageSize: 10,
  });

  // Fetch tickets
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTickets(mockTickets);
    } catch (error) {
      message.error('Không thể tải danh sách ticket');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (filters.status) {
      result = result.filter(t => t.status === filters.status);
    }

    if (filters.category) {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.priority) {
      result = result.filter(t => t.priority === filters.priority);
    }

    if (filters.assignedTo) {
      result = result.filter(t => t.assignedTo === filters.assignedTo);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        t =>
          t.ticketId.toLowerCase().includes(searchLower) ||
          t.subject.toLowerCase().includes(searchLower) ||
          t.userName.toLowerCase().includes(searchLower) ||
          t.userEmail.toLowerCase().includes(searchLower)
      );
    }

    // Sort by priority and date
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    result.sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [tickets, filters]);

  // Paginated tickets
  const paginatedTickets = useMemo(() => {
    const { page, pageSize } = tableParams;
    const start = (page - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, tableParams]);

  // Assign ticket
  const assignTicket = useCallback(async (ticketId: string, assignedTo: string, assignedName: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? {
                ...t,
                assignedTo,
                assignedName,
                status: t.status === 'open' ? 'in_progress' as const : t.status,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      
      message.success('Đã phân công ticket');
      return { success: true };
    } catch (error) {
      message.error('Không thể phân công ticket');
      return { success: false };
    }
  }, []);

  // Update ticket status
  const updateTicketStatus = useCallback(async (ticketId: string, status: AdminSupportTicket['status']) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? {
                ...t,
                status,
                updatedAt: new Date().toISOString(),
                resolvedAt: status === 'resolved' || status === 'closed' ? new Date().toISOString() : t.resolvedAt,
              }
            : t
        )
      );
      
      message.success('Đã cập nhật trạng thái ticket');
      return { success: true };
    } catch (error) {
      message.error('Không thể cập nhật trạng thái');
      return { success: false };
    }
  }, []);

  // Update ticket priority
  const updateTicketPriority = useCallback(async (ticketId: string, priority: AdminSupportTicket['priority']) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? { ...t, priority, updatedAt: new Date().toISOString() }
            : t
        )
      );
      
      message.success('Đã cập nhật độ ưu tiên');
      return { success: true };
    } catch (error) {
      message.error('Không thể cập nhật độ ưu tiên');
      return { success: false };
    }
  }, []);

  // Add response to ticket
  const addResponse = useCallback(async (ticketId: string, messageText: string, attachments?: string[]) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newResponse: TicketResponse = {
        id: `resp-${Date.now()}`,
        message: messageText,
        authorId: currentAdminUser.id,
        authorName: `${currentAdminUser.firstName} ${currentAdminUser.lastName}`,
        authorAvatar: currentAdminUser.avatar,
        isStaff: true,
        attachments,
        createdAt: new Date().toISOString(),
      };
      
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? {
                ...t,
                responses: [...t.responses, newResponse],
                status: t.status === 'open' ? 'in_progress' as const : t.status,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      
      // Update selected ticket if viewing
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => prev ? {
          ...prev,
          responses: [...prev.responses, newResponse],
          updatedAt: new Date().toISOString(),
        } : null);
      }
      
      message.success('Đã gửi phản hồi');
      return { success: true };
    } catch (error) {
      message.error('Không thể gửi phản hồi');
      return { success: false };
    }
  }, [selectedTicket]);

  // Close ticket
  const closeTicket = useCallback(async (ticketId: string) => {
    return updateTicketStatus(ticketId, 'closed');
  }, [updateTicketStatus]);

  // Resolve ticket
  const resolveTicket = useCallback(async (ticketId: string) => {
    return updateTicketStatus(ticketId, 'resolved');
  }, [updateTicketStatus]);

  // Reopen ticket
  const reopenTicket = useCallback(async (ticketId: string) => {
    return updateTicketStatus(ticketId, 'open');
  }, [updateTicketStatus]);

  // Get ticket by ID
  const getTicketById = useCallback((ticketId: string) => {
    return tickets.find(t => t.id === ticketId) || null;
  }, [tickets]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Statistics
  const statistics = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    waiting: tickets.filter(t => t.status === 'waiting').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    urgent: tickets.filter(t => t.priority === 'urgent' && t.status !== 'closed' && t.status !== 'resolved').length,
    high: tickets.filter(t => t.priority === 'high' && t.status !== 'closed' && t.status !== 'resolved').length,
    byCategory: tickets.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    avgResponseTime: '2.5 giờ', // Mock data
  }), [tickets]);

  return {
    tickets: paginatedTickets,
    allTickets: filteredTickets,
    loading,
    selectedTicket,
    setSelectedTicket,
    filters,
    setFilters,
    tableParams,
    setTableParams,
    statistics,
    total: filteredTickets.length,
    fetchTickets,
    assignTicket,
    updateTicketStatus,
    updateTicketPriority,
    addResponse,
    closeTicket,
    resolveTicket,
    reopenTicket,
    getTicketById,
  };
};

