import { useState, useMemo } from 'react';
import { message } from 'antd';
import { useGetEnrollmentsByCourseQuery } from '../services/courseApi';
import { useGetProfileQuery } from '../services/authApi';
import type { ClassMember } from '../types/myCourse';

export const useClassroom = (courseId: string) => {
  const { data: profileData } = useGetProfileQuery();
  const userRole = (profileData?.data?.role as 'student' | 'teacher') || 'student';

  const { data: enrollmentsData, isLoading, refetch } = useGetEnrollmentsByCourseQuery(courseId, {
    skip: !courseId,
  });

  const members: ClassMember[] = useMemo(() => {
    const enrollments = enrollmentsData?.data;
    if (!enrollments) return [];
    return enrollments.map((enrollment) => {
      const user = enrollment.user;
      return {
        id: enrollment.id,
        name: user ? `${user.firstName} ${user.lastName}` : 'Không rõ',
        email: user?.email || '',
        avatar: user?.avatar || '',
        role: 'student' as const,
        joinedAt: enrollment.createdAt,
        status: (enrollment.status === 'active' ? 'active' : 'inactive') as 'active' | 'inactive',
        progress: enrollment.progress,
      };
    });
  }, [enrollmentsData]);

  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<ClassMember | null>(null);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchText.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchText.toLowerCase());
      const matchesRole = filterRole === 'all' || member.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [members, searchText, filterRole]);

  const stats = useMemo(() => ({
    total: members.length,
    teachers: members.filter(m => m.role === 'teacher').length,
    students: members.filter(m => m.role === 'student').length,
    active: members.filter(m => m.status === 'active').length,
  }), [members]);

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'teacher':
        return { color: 'gold', text: 'Giảng viên' };
      case 'assistant':
        return { color: 'purple', text: 'Trợ giảng' };
      case 'student':
      default:
        return { color: 'blue', text: 'Học viên' };
    }
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: ClassMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (_memberId: string) => {
    message.success('Đã xóa thành viên');
    refetch();
  };

  const handleSubmit = (_values: Record<string, unknown>) => {
    if (editingMember) {
      message.success('Đã cập nhật thành viên');
    } else {
      message.success('Đã thêm thành viên');
    }
    setIsModalOpen(false);
    refetch();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    userRole,
    members,
    filteredMembers,
    searchText,
    setSearchText,
    filterRole,
    setFilterRole,
    isModalOpen,
    editingMember,
    stats,
    isLoading,
    getRoleConfig,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    handleSubmit,
    closeModal,
  };
};
