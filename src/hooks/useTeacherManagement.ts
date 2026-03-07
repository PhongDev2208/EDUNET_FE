// Teacher Management Hook
import { useState, useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';
import type { Teacher, TableParams } from '../types/admin';
import { teachers as mockTeachers } from '../constants/adminData';

interface TeacherFilters {
  status?: string;
  specialization?: string;
  search?: string;
}

export const useTeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [filters, setFilters] = useState<TeacherFilters>({});
  const [tableParams, setTableParams] = useState<TableParams>({
    page: 1,
    pageSize: 10,
  });

  // Fetch teachers
  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTeachers(mockTeachers);
    } catch (error) {
      message.error('Không thể tải danh sách giáo viên');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    let result = [...teachers];

    if (filters.status) {
      result = result.filter(t => t.status === filters.status);
    }

    if (filters.specialization) {
      result = result.filter(t =>
        t.specialization.some(s => s.toLowerCase().includes(filters.specialization!.toLowerCase()))
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        t =>
          `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchLower) ||
          t.email.toLowerCase().includes(searchLower) ||
          t.teacherId.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [teachers, filters]);

  // Paginated teachers
  const paginatedTeachers = useMemo(() => {
    const { page, pageSize } = tableParams;
    const start = (page - 1) * pageSize;
    return filteredTeachers.slice(start, start + pageSize);
  }, [filteredTeachers, tableParams]);

  // Approve teacher
  const approveTeacher = useCallback(async (teacherId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacherId ? { ...t, status: 'active' as const } : t
        )
      );
      
      message.success('Đã duyệt giáo viên');
      return { success: true };
    } catch (error) {
      message.error('Không thể duyệt giáo viên');
      return { success: false };
    }
  }, []);

  // Suspend teacher
  const suspendTeacher = useCallback(async (teacherId: string, _reason?: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacherId ? { ...t, status: 'suspended' as const } : t
        )
      );
      
      message.success('Đã tạm ngưng giáo viên');
      return { success: true };
    } catch (error) {
      message.error('Không thể tạm ngưng giáo viên');
      return { success: false };
    }
  }, []);

  // Activate teacher
  const activateTeacher = useCallback(async (teacherId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacherId ? { ...t, status: 'active' as const } : t
        )
      );
      
      message.success('Đã kích hoạt giáo viên');
      return { success: true };
    } catch (error) {
      message.error('Không thể kích hoạt giáo viên');
      return { success: false };
    }
  }, []);

  // Update teacher
  const updateTeacher = useCallback(async (teacherId: string, data: Partial<Teacher>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacherId ? { ...t, ...data } : t
        )
      );
      
      message.success('Đã cập nhật thông tin giáo viên');
      return { success: true };
    } catch (error) {
      message.error('Không thể cập nhật giáo viên');
      return { success: false };
    }
  }, []);

  // Delete teacher
  const deleteTeacher = useCallback(async (teacherId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeachers(prev => prev.filter(t => t.id !== teacherId));
      
      message.success('Đã xóa giáo viên');
      return { success: true };
    } catch (error) {
      message.error('Không thể xóa giáo viên');
      return { success: false };
    }
  }, []);

  // Get teacher by ID
  const getTeacherById = useCallback((teacherId: string) => {
    return teachers.find(t => t.id === teacherId) || null;
  }, [teachers]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  // Statistics
  const statistics = useMemo(() => ({
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    pending: teachers.filter(t => t.status === 'pending').length,
    suspended: teachers.filter(t => t.status === 'suspended').length,
    totalCourses: teachers.reduce((sum, t) => sum + t.totalCourses, 0),
    totalStudents: teachers.reduce((sum, t) => sum + t.totalStudents, 0),
    totalEarnings: teachers.reduce((sum, t) => sum + t.earnings, 0),
    averageRating: teachers.length > 0
      ? teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length
      : 0,
  }), [teachers]);

  // Get all specializations for filters
  const allSpecializations = useMemo(() => {
    const specs = new Set<string>();
    teachers.forEach(t => t.specialization.forEach(s => specs.add(s)));
    return Array.from(specs).sort();
  }, [teachers]);

  return {
    teachers: paginatedTeachers,
    allTeachers: filteredTeachers,
    loading,
    selectedTeacher,
    setSelectedTeacher,
    filters,
    setFilters,
    tableParams,
    setTableParams,
    statistics,
    total: filteredTeachers.length,
    allSpecializations,
    fetchTeachers,
    approveTeacher,
    suspendTeacher,
    activateTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
  };
};

