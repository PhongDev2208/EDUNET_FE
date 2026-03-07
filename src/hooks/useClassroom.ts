import { useState, useMemo } from 'react';
import { message } from 'antd';
import { MOCK_CLASS_MEMBERS } from '../constants/myCourseData';
import type { ClassMember } from '../types/myCourse';

export const useClassroom = () => {
  const [userRole] = useState<'student' | 'teacher'>('teacher');
  const [members, setMembers] = useState<ClassMember[]>(MOCK_CLASS_MEMBERS);
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
        return { color: 'gold', text: 'Instructor' };
      case 'assistant':
        return { color: 'purple', text: 'Assistant' };
      case 'student':
      default:
        return { color: 'blue', text: 'Student' };
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

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
    message.success('Member removed successfully');
  };

  const handleSubmit = (values: any) => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...values } : m));
      message.success('Member updated successfully');
    } else {
      const newMember: ClassMember = {
        id: Date.now().toString(),
        ...values,
        joinedAt: new Date().toISOString().split('T')[0],
        status: 'active',
        progress: 0,
      };
      setMembers([...members, newMember]);
      message.success('Member added successfully');
    }
    setIsModalOpen(false);
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
    getRoleConfig,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    handleSubmit,
    closeModal,
  };
};
