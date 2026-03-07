import React, { useState } from 'react';
import { Card, Col, Row, Typography, Progress, Avatar, Breadcrumb, Tag, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  TeamOutlined,
  RocketOutlined,
  ReadOutlined,
  BookOutlined,
  BellOutlined,
  FileTextOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DetailMyCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userRole] = useState<'student' | 'teacher'>('teacher'); // Mock: change to test roles

  // Mock course data
  const courseInfo = {
    title: 'The Complete Web Developer Course 2.0',
    teacher: 'John Smith',
    teacherAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    progress: 48,
    totalLessons: 25,
    completedLessons: 12,
    nextLesson: 'Flexbox Layout',
    nextLessonTime: 'Tomorrow at 10:00 AM',
    image: 'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg',
  };

  const menuItems = [
    {
      key: 'classroom',
      title: 'Classroom',
      description: 'View members and manage class participants',
      icon: <TeamOutlined className="text-3xl" />,
      link: `/my-course/classroom/${id}`,
      color: 'from-blue-500 to-blue-600',
      stats: '32 Members',
      badge: userRole === 'teacher' ? 'Manage' : null,
    },
    {
      key: 'learning-path',
      title: 'Learning Path',
      description: 'Course roadmap and curriculum overview',
      icon: <RocketOutlined className="text-3xl" />,
      link: `/my-course/learning-path/${id}`,
      color: 'from-purple-500 to-indigo-600',
      stats: '4 Modules',
      badge: null,
    },
    {
      key: 'assignments',
      title: 'Assignments',
      description: userRole === 'teacher' ? 'Create and grade assignments' : 'Submit and track assignments',
      icon: <FileTextOutlined className="text-3xl" />,
      link: `/my-course/assignment/index/${id}`,
      color: 'from-orange-500 to-red-500',
      stats: '3 Pending',
      badge: userRole === 'teacher' ? 'Create' : '2 Due',
    },
    {
      key: 'quizzes',
      title: 'Quizzes',
      description: userRole === 'teacher' ? 'Create and manage quizzes' : 'Take quizzes to test knowledge',
      icon: <ReadOutlined className="text-3xl" />,
      link: `/my-course/quizz/${id}`,
      color: 'from-green-500 to-emerald-600',
      stats: '4 Quizzes',
      badge: userRole === 'teacher' ? 'Create' : null,
    },
    {
      key: 'materials',
      title: 'Materials',
      description: userRole === 'teacher' ? 'Upload and manage course materials' : 'Download course resources',
      icon: <BookOutlined className="text-3xl" />,
      link: `/my-course/material/${id}`,
      color: 'from-cyan-500 to-teal-500',
      stats: '6 Files',
      badge: userRole === 'teacher' ? 'Upload' : null,
    },
    {
      key: 'notifications',
      title: 'Announcements',
      description: userRole === 'teacher' ? 'Post announcements to class' : 'View class announcements',
      icon: <BellOutlined className="text-3xl" />,
      link: `/my-course/notifications/${id}`,
      color: 'from-pink-500 to-rose-500',
      stats: '2 New',
      badge: userRole === 'teacher' ? 'Post' : null,
    },
  ];

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Breadcrumb */}
        <Breadcrumb 
          className="mb-6"
          items={[
            { title: <Link to="/"><HomeOutlined /> Home</Link> },
            { title: <Link to="/my-course">My Courses</Link> },
            { title: courseInfo.title },
          ]}
        />

        {/* Course Header Card */}
        <Card className="rounded-2xl border-0 shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Course Image */}
            <div className="lg:w-80 h-48 lg:h-auto rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={courseInfo.image} 
                alt={courseInfo.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Tag color={userRole === 'teacher' ? 'gold' : 'blue'} className="!rounded-full !mb-2">
                    {userRole === 'teacher' ? '👨‍🏫 Instructor' : '👨‍🎓 Student'}
                  </Tag>
                  <Title level={2} className="!text-[#012643] !mb-2">{courseInfo.title}</Title>
                  <div className="flex items-center gap-3">
                    <Avatar src={courseInfo.teacherAvatar} size={40} />
                    <div>
                      <Text className="block font-semibold text-[#012643]">{courseInfo.teacher}</Text>
                      <Text className="text-gray-500 text-sm">Instructor</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-semibold text-[#012643]">Course Progress</Text>
                  <Text className="text-2xl font-bold text-[#17EAD9]">{courseInfo.progress}%</Text>
                </div>
                <Progress 
                  percent={courseInfo.progress} 
                  strokeColor={{ '0%': '#17EAD9', '100%': '#012643' }}
                  showInfo={false}
                  size={{ height: 10 }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span><TrophyOutlined className="mr-1" />{courseInfo.completedLessons} completed</span>
                  <span>{courseInfo.totalLessons - courseInfo.completedLessons} remaining</span>
                </div>
              </div>

              {/* Next Lesson Info */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <PlayCircleOutlined className="text-white text-xl" />
                    </div>
                    <div>
                      <Text className="text-xs text-blue-600 font-medium">NEXT LESSON</Text>
                      <Text className="block font-semibold text-[#012643]">{courseInfo.nextLesson}</Text>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <CalendarOutlined className="text-white text-xl" />
                    </div>
                    <div>
                      <Text className="text-xs text-green-600 font-medium">SCHEDULED</Text>
                      <Text className="block font-semibold text-[#012643]">{courseInfo.nextLessonTime}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Grid */}
        <Row gutter={[20, 20]}>
          {menuItems.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.key}>
              <Link to={item.link}>
                <Card 
                  className="h-full rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  bodyStyle={{ padding: 0 }}
                >
                  <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      {item.badge && (
                        <Tag color="white" className="!text-gray-800 !rounded-full !font-medium">
                          {item.badge}
                        </Tag>
                      )}
                    </div>
                    <Title level={4} className="!text-white !mt-4 !mb-1">{item.title}</Title>
                    <Text className="text-white/80 text-sm">{item.stats}</Text>
                  </div>
                  <div className="p-5">
                    <Text className="text-gray-600 block mb-3">{item.description}</Text>
                    <div className="flex items-center text-[#012643] font-medium group-hover:translate-x-2 transition-transform">
                      <span>Open</span>
                      <ArrowRightOutlined className="ml-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Quick Actions for Teacher */}
        {userRole === 'teacher' && (
          <Card className="rounded-2xl border-0 shadow-md mt-8">
            <Title level={4} className="!text-[#012643] !mb-4">Quick Actions</Title>
            <div className="flex flex-wrap gap-3">
              <Button type="primary" icon={<TeamOutlined />} className="!bg-blue-500 !border-blue-500 !rounded-lg">
                Add Student
              </Button>
              <Button type="primary" icon={<FileTextOutlined />} className="!bg-orange-500 !border-orange-500 !rounded-lg">
                Create Assignment
              </Button>
              <Button type="primary" icon={<ReadOutlined />} className="!bg-green-500 !border-green-500 !rounded-lg">
                Create Quiz
              </Button>
              <Button type="primary" icon={<BookOutlined />} className="!bg-cyan-500 !border-cyan-500 !rounded-lg">
                Upload Material
              </Button>
              <Button type="primary" icon={<BellOutlined />} className="!bg-pink-500 !border-pink-500 !rounded-lg">
                Post Announcement
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DetailMyCourse;
