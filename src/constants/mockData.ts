import type { Course, Category } from '../models/course';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Design', count: 120, image: 'https://img.freepik.com/free-vector/graphic-design-colorful-geometrical-lettering_52683-34588.jpg' },
  { id: 2, name: 'Development', count: 80, image: 'https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg' },
  { id: 3, name: 'Marketing', count: 50, image: 'https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg' },
  { id: 4, name: 'Business', count: 40, image: 'https://img.freepik.com/free-vector/business-team-brainstorming-discussing-startup-project_74855-6909.jpg' },
  { id: 5, name: 'Music', count: 60, image: 'https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg' },
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'The Complete Web Developer Course 2.0',
    author: 'Rob Percival',
    image: 'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg',
    price: 19.99,
    lessons: 25,
    duration: '12h 30m',
    category: 'Development',
    startDate: '2023-10-01'
  },
  {
    id: 2,
    title: 'Digital Marketing Masterclass - 23 Courses in 1',
    author: 'Phil Ebiner',
    image: 'https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg',
    price: 14.99,
    lessons: 18,
    duration: '8h 15m',
    category: 'Marketing',
    startDate: '2023-10-05'
  },
  {
    id: 3,
    title: 'Graphic Design Masterclass - Learn GREAT Design',
    author: 'Lindsay Marsh',
    image: 'https://img.freepik.com/free-photo/graphic-designer-working-tablet_23-2147652935.jpg',
    price: 24.99,
    lessons: 30,
    duration: '15h 45m',
    category: 'Design',
    startDate: '2023-10-10'
  },
  {
    id: 4,
    title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
    author: 'Jose Portilla',
    image: 'https://img.freepik.com/free-photo/python-programming-language-program-code-screen_53876-133553.jpg',
    price: 29.99,
    lessons: 40,
    duration: '20h 00m',
    category: 'Development',
    startDate: '2023-10-15'
  },
  {
    id: 5,
    title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
    author: 'Kirill Eremenko',
    image: 'https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-chip-vector-technology-concept_53876-112302.jpg',
    price: 34.99,
    lessons: 50,
    duration: '40h 00m',
    category: 'Data Science',
    startDate: '2023-10-20'
  },
  {
    id: 6,
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    author: 'Rob Percival',
    image: 'https://img.freepik.com/free-photo/marketing-strategy-planning-strategy-concept_53876-42950.jpg',
    price: 19.99,
    lessons: 22,
    duration: '22h 30m',
    category: 'Marketing',
    startDate: '2023-10-25'
  },
];

export const COURSE_DETAIL_DATA: Course = {
  id: '1',
  title: 'The Complete Web Developer Course 2.0',
  price: 4000000,
  discountPrice: 2500000,
  description: '<p>Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!</p>',
  goal: '<p>You will learn how to build a website from scratch.</p><p>You will learn how to make money as a developer.</p>',
  image: 'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg',
  author: 'Rob Percival',
  category: 'Development',
  lessons: 25,
  duration: '12h 30m',
  teacher: {
    name: 'Rob Percival',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rob'
  },
  time: { startDisplay: '08:00 AM' },
  schedule: ['Mon', 'Wed', 'Fri'],
  hours: ['2h', '2h', '2h'],
  content: [
    {
      title: 'Introduction',
      items: ['Welcome to the course', 'How to get help', 'Installing the software']
    },
    {
      title: 'HTML 5',
      items: ['Basic HTML', 'Advanced HTML', 'HTML 5 Features']
    },
    {
      title: 'CSS 3',
      items: ['Basic CSS', 'Styling Text', 'CSS Layouts']
    }
  ],
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      rate: 5,
      date: '2 days ago',
      content: 'Great course! I learned a lot.',
      role: 'Student',
      images: []
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      rate: 4,
      date: '1 week ago',
      content: 'Good content but the audio quality could be better.',
      role: 'Student',
      images: []
    }
  ]
};

export const FILTER_CATEGORIES = ['All', 'Marketing', 'Design', 'Development', 'Business', 'Music'];
export const FILTER_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
