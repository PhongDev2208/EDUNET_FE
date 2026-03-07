import { useState, useCallback, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { MOCK_SCHEDULE_EVENTS } from '../constants/scheduleData';
import type { ScheduleEvent } from '../types/schedule';

export const useSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Get events for a specific date
  const getEventsForDate = useCallback((date: Dayjs): ScheduleEvent[] => {
    return MOCK_SCHEDULE_EVENTS.filter(event => 
      dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD') &&
      (filterType === 'all' || event.type === filterType)
    );
  }, [filterType]);

  // Get upcoming events
  const upcomingEvents = useMemo(() => {
    return MOCK_SCHEDULE_EVENTS
      .filter(event => dayjs(event.date).isAfter(dayjs().subtract(1, 'day')))
      .filter(event => filterType === 'all' || event.type === filterType)
      .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
      .slice(0, 5);
  }, [filterType]);

  // Get today's events
  const todayEvents = useMemo(() => {
    return getEventsForDate(dayjs());
  }, [getEventsForDate]);

  // Statistics
  const stats = useMemo(() => ({
    total: MOCK_SCHEDULE_EVENTS.length,
    classes: MOCK_SCHEDULE_EVENTS.filter(e => e.type === 'class').length,
    assignments: MOCK_SCHEDULE_EVENTS.filter(e => e.type === 'assignment' || e.type === 'deadline').length,
    quizzes: MOCK_SCHEDULE_EVENTS.filter(e => e.type === 'quiz').length,
  }), []);

  // Event handlers
  const openEventModal = useCallback((event: ScheduleEvent | null) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDateSelect = useCallback((date: Dayjs) => {
    setSelectedDate(date);
    const events = MOCK_SCHEDULE_EVENTS.filter(event => 
      dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD') &&
      (filterType === 'all' || event.type === filterType)
    );
    
    if (events.length === 1) {
      setSelectedEvent(events[0]);
      setIsModalOpen(true);
    } else if (events.length > 1) {
      setSelectedEvent(null);
      setIsModalOpen(true);
    }
  }, [filterType]);

  return {
    selectedDate,
    setSelectedDate,
    isModalOpen,
    selectedEvent,
    filterType,
    setFilterType,
    getEventsForDate,
    upcomingEvents,
    todayEvents,
    stats,
    openEventModal,
    closeModal,
    handleDateSelect,
  };
};
