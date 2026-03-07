import { useState, useMemo } from 'react';
import { message } from 'antd';
import { MOCK_ASSIGNMENTS } from '../constants/myCourseData';
import type { AssignmentItem } from '../types/myCourse';

export const useAssignment = () => {
  const [userRole] = useState<'student' | 'teacher'>('teacher');
  const [assignments, setAssignments] = useState<AssignmentItem[]>(MOCK_ASSIGNMENTS);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchText, filterStatus]);

  const stats = useMemo(() => ({
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
  }), [assignments]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'processing', text: 'Pending' };
      case 'submitted':
        return { color: 'warning', text: 'Submitted' };
      case 'graded':
        return { color: 'success', text: 'Graded' };
      case 'overdue':
        return { color: 'error', text: 'Overdue' };
      default:
        return { color: 'default', text: 'Unknown' };
    }
  };

  const handleCreate = () => {
    setSelectedAssignment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assignment: AssignmentItem) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleView = (assignment: AssignmentItem) => {
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true);
  };

  const handleDelete = (assignmentId: string) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    message.success('Assignment deleted successfully');
  };

  const handleSubmit = (values: any) => {
    if (selectedAssignment) {
      setAssignments(assignments.map(a => 
        a.id === selectedAssignment.id ? { ...a, ...values } : a
      ));
      message.success('Assignment updated successfully');
    } else {
      const newAssignment: AssignmentItem = {
        id: Date.now().toString(),
        ...values,
        status: 'pending',
        attachments: [],
      };
      setAssignments([...assignments, newAssignment]);
      message.success('Assignment created successfully');
    }
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  return {
    userRole,
    assignments,
    filteredAssignments,
    searchText,
    setSearchText,
    filterStatus,
    setFilterStatus,
    isModalOpen,
    isViewModalOpen,
    selectedAssignment,
    stats,
    getStatusConfig,
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleSubmit,
    closeModal,
    closeViewModal,
  };
};
