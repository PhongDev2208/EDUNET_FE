import { useState, useMemo } from 'react';
import { MOCK_MY_COURSES } from '../constants/myCourseData';

export const useMyCourse = () => {
  const [viewMode, setViewMode] = useState<string | number>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredCourses = useMemo(() => {
    return MOCK_MY_COURSES.filter(course => {
      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      const matchesSearch = course.title.toLowerCase().includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchText]);

  const stats = useMemo(() => ({
    total: MOCK_MY_COURSES.length,
    inProgress: MOCK_MY_COURSES.filter(c => c.status === 'learning').length,
    completed: MOCK_MY_COURSES.filter(c => c.status === 'completed').length,
    notStarted: MOCK_MY_COURSES.filter(c => c.status === 'pending').length,
  }), []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'learning':
        return { color: 'processing', text: 'In Progress' };
      case 'completed':
        return { color: 'success', text: 'Completed' };
      case 'pending':
        return { color: 'warning', text: 'Not Started' };
      default:
        return { color: 'default', text: 'Unknown' };
    }
  };

  return {
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    searchText,
    setSearchText,
    filteredCourses,
    stats,
    getStatusConfig,
  };
};
