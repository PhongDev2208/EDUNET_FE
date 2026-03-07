// Dashboard Hook
import { useState, useEffect, useCallback } from 'react';
import type { DashboardStats, RevenueData, AdminNotification, ActivityLog, ChartData } from '../types/admin';
import { 
  dashboardStats, 
  revenueData, 
  adminNotifications, 
  activityLogs,
  adminCourses,
  teachers,
  supportTickets,
} from '../constants/adminData';

interface DashboardData {
  stats: DashboardStats;
  revenueData: RevenueData[];
  notifications: AdminNotification[];
  activities: ActivityLog[];
  revenueChart: ChartData;
  usersChart: ChartData;
  coursesChart: ChartData;
  topCourses: typeof adminCourses;
  topTeachers: typeof teachers;
  recentTickets: typeof supportTickets;
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[string, string]>(['2024-01-01', '2024-12-31']);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate chart data
      const revenueChart: ChartData = {
        labels: revenueData.map(r => r.date),
        datasets: [
          {
            label: 'Doanh thu',
            data: revenueData.map(r => r.revenue / 1000000),
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            fill: true,
          },
          {
            label: 'Doanh thu ròng',
            data: revenueData.map(r => r.netRevenue / 1000000),
            borderColor: '#52c41a',
            backgroundColor: 'rgba(82, 196, 26, 0.1)',
            fill: true,
          },
        ],
      };

      const usersChart: ChartData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Người dùng mới',
            data: [820, 932, 1101, 1234, 1450, 1580, 1620, 1750, 1890, 2050, 2200, 2350],
            backgroundColor: '#1890ff',
          },
        ],
      };

      const coursesChart: ChartData = {
        labels: ['Lập trình Web', 'Data Science', 'Thiết kế', 'Marketing', 'Cloud', 'Mobile'],
        datasets: [
          {
            label: 'Số lượng khóa học',
            data: [245, 156, 89, 78, 65, 54],
            backgroundColor: [
              '#1890ff',
              '#52c41a',
              '#faad14',
              '#f5222d',
              '#722ed1',
              '#13c2c2',
            ],
          },
        ],
      };

      // Sort and get top items
      const topCourses = [...adminCourses]
        .filter(c => c.status === 'published')
        .sort((a, b) => b.totalStudents - a.totalStudents)
        .slice(0, 5);

      const topTeachers = [...teachers]
        .filter(t => t.status === 'active')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      const recentTickets = [...supportTickets]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setData({
        stats: dashboardStats,
        revenueData,
        notifications: adminNotifications,
        activities: activityLogs,
        revenueChart,
        usersChart,
        coursesChart,
        topCourses,
        topTeachers,
        recentTickets,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    if (!data) return;
    
    const updatedNotifications = data.notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
    
    setData({
      ...data,
      notifications: updatedNotifications,
    });
  }, [data]);

  const markAllNotificationsRead = useCallback(() => {
    if (!data) return;
    
    const updatedNotifications = data.notifications.map(n => ({ ...n, isRead: true }));
    
    setData({
      ...data,
      notifications: updatedNotifications,
    });
  }, [data]);

  const refreshData = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const unreadNotificationsCount = data?.notifications.filter(n => !n.isRead).length || 0;

  return {
    data,
    loading,
    dateRange,
    setDateRange,
    markNotificationRead,
    markAllNotificationsRead,
    refreshData,
    unreadNotificationsCount,
  };
};
