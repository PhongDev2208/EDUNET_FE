import { useState, useMemo } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUIZZES } from '../constants/myCourseData';
import type { QuizItem } from '../types/myCourse';

export const useQuiz = () => {
  const navigate = useNavigate();
  const [userRole] = useState<'student' | 'teacher'>('teacher');
  const [quizzes, setQuizzes] = useState<QuizItem[]>(MOCK_QUIZZES);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = filterStatus === 'all' || quiz.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [quizzes, searchText, filterStatus]);

  const stats = useMemo(() => ({
    total: quizzes.length,
    completed: quizzes.filter(q => q.status === 'completed').length,
    notStarted: quizzes.filter(q => q.status === 'not-started').length,
    avgScore: Math.round(
      quizzes.filter(q => q.bestScore !== undefined).reduce((acc, q) => acc + (q.bestScore || 0), 0) / 
      Math.max(quizzes.filter(q => q.bestScore !== undefined).length, 1)
    ),
  }), [quizzes]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'success', text: 'Completed' };
      case 'in-progress':
        return { color: 'processing', text: 'In Progress' };
      case 'not-started':
      default:
        return { color: 'default', text: 'Not Started' };
    }
  };

  const handleCreate = () => {
    setSelectedQuiz(null);
    setIsModalOpen(true);
  };

  const handleEdit = (quiz: QuizItem) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleDelete = (quizId: string) => {
    setQuizzes(quizzes.filter(q => q.id !== quizId));
    message.success('Quiz deleted successfully');
  };

  const handleSubmit = (values: any) => {
    if (selectedQuiz) {
      setQuizzes(quizzes.map(q => 
        q.id === selectedQuiz.id ? { ...q, ...values } : q
      ));
      message.success('Quiz updated successfully');
    } else {
      const newQuiz: QuizItem = {
        id: Date.now().toString(),
        ...values,
        attempts: 0,
        status: 'not-started',
      };
      setQuizzes([...quizzes, newQuiz]);
      message.success('Quiz created successfully');
    }
    setIsModalOpen(false);
  };

  const handleStartQuiz = (quiz: QuizItem) => {
    navigate(`/my-course/quizz/practics/${quiz.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    userRole,
    quizzes,
    filteredQuizzes,
    searchText,
    setSearchText,
    filterStatus,
    setFilterStatus,
    isModalOpen,
    selectedQuiz,
    stats,
    getStatusConfig,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleStartQuiz,
    closeModal,
  };
};
