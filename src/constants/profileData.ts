import type { UserProfile, Achievement, Certificate, SupportTicket } from '../types/profile';

export const MOCK_USER_PROFILE: UserProfile = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 234 567 890',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: 'Passionate learner and aspiring web developer. Currently exploring React and TypeScript to build modern web applications.',
  dateOfBirth: '1995-06-15',
  gender: 'male',
  address: '123 Learning Street',
  city: 'San Francisco',
  country: 'United States',
  joinedDate: '2024-01-01',
  role: 'student',
  socialLinks: {
    facebook: 'https://facebook.com/alexjohnson',
    twitter: 'https://twitter.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
  },
};

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'First Course Completed',
    description: 'Completed your first course on EduNet',
    icon: '🎓',
    earnedAt: '2024-02-15',
    type: 'course',
  },
  {
    id: '2',
    title: 'Quiz Master',
    description: 'Scored 100% on 5 quizzes',
    icon: '🏆',
    earnedAt: '2024-03-10',
    type: 'quiz',
  },
  {
    id: '3',
    title: '7-Day Streak',
    description: 'Learned for 7 consecutive days',
    icon: '🔥',
    earnedAt: '2024-03-20',
    type: 'streak',
  },
  {
    id: '4',
    title: 'Helpful Contributor',
    description: 'Helped 10 students in forums',
    icon: '🤝',
    earnedAt: '2024-04-05',
    type: 'community',
  },
  {
    id: '5',
    title: 'Early Adopter',
    description: 'Joined EduNet in its first year',
    icon: '⭐',
    earnedAt: '2024-01-01',
    type: 'special',
  },
  {
    id: '6',
    title: '30-Day Streak',
    description: 'Learned for 30 consecutive days',
    icon: '💎',
    earnedAt: '2024-05-01',
    type: 'streak',
  },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    courseName: 'Digital Marketing Masterclass',
    issueDate: '2024-11-15',
    credentialId: 'CERT-DM-2024-001',
    downloadUrl: '/certificates/dm-masterclass.pdf',
  },
  {
    id: '2',
    courseName: 'HTML & CSS Fundamentals',
    issueDate: '2024-09-20',
    credentialId: 'CERT-WD-2024-045',
    downloadUrl: '/certificates/html-css.pdf',
  },
  {
    id: '3',
    courseName: 'JavaScript Essentials',
    issueDate: '2024-10-30',
    credentialId: 'CERT-JS-2024-089',
    downloadUrl: '/certificates/javascript.pdf',
    expiryDate: '2026-10-30',
  },
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot access course videos',
    description: 'I am unable to play videos in the Web Development course. The player shows a loading spinner but never plays.',
    category: 'technical',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2024-11-28T10:30:00',
    updatedAt: '2024-11-29T14:00:00',
    responses: [
      {
        id: '1',
        message: 'Thank you for reporting this issue. Our technical team is looking into it.',
        isStaff: true,
        authorName: 'Support Team',
        authorAvatar: '',
        createdAt: '2024-11-28T11:00:00',
      },
      {
        id: '2',
        message: 'Could you please try clearing your browser cache and try again?',
        isStaff: true,
        authorName: 'Tech Support',
        authorAvatar: '',
        createdAt: '2024-11-29T14:00:00',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Request for invoice',
    description: 'I need an invoice for my recent course purchase for reimbursement purposes.',
    category: 'billing',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-11-20T09:00:00',
    updatedAt: '2024-11-21T16:00:00',
    responses: [
      {
        id: '1',
        message: 'Your invoice has been sent to your registered email address.',
        isStaff: true,
        authorName: 'Billing Team',
        authorAvatar: '',
        createdAt: '2024-11-21T16:00:00',
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Course content outdated',
    description: 'The React course uses version 16 but the current version is 18. Please update.',
    category: 'course',
    status: 'open',
    priority: 'low',
    createdAt: '2024-11-25T15:00:00',
    updatedAt: '2024-11-25T15:00:00',
    responses: [],
  },
];

export const SUPPORT_CATEGORIES = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'course', label: 'Course Content' },
  { value: 'account', label: 'Account & Profile' },
  { value: 'other', label: 'Other' },
];

export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'high', label: 'High', color: 'red' },
  { value: 'urgent', label: 'Urgent', color: 'magenta' },
];
