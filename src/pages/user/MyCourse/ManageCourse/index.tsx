import React, { useState } from 'react';
import { Tabs, Typography, Breadcrumb, Card, Spin } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../../../../services/courseApi';
import ClassroomTab from './components/ClassroomTab';
import MaterialsTab from './components/MaterialsTab';
import AssignmentsTab from './components/AssignmentsTab';
import QuizzesTab from './components/QuizzesTab';

const { Title, Text } = Typography;

const ManageCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: courseData, isLoading } = useGetCourseByIdQuery({ id: id! }, { skip: !id });
  const [activeTab, setActiveTab] = useState('lessons');

  const course = courseData?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Đang tải dữ liệu khóa học..." />
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6">
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item><Link to="/my-course">Quản lý khóa học</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{course?.title || 'Quản lý khóa học'}</Breadcrumb.Item>
        </Breadcrumb>
        
        <div className="mb-6">
          <Title level={2} className="!text-[#012643] !mb-1">
            {course?.title || 'Quản lý khóa học'}
          </Title>
          <Text className="text-gray-500 text-lg">Quản lý bài học, tài liệu, bài tập và quiz</Text>
        </div>

        <Card className="rounded-2xl border-0 shadow-md">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            size="large"
            items={[
              {
                key: 'lessons',
                label: 'Bài học (Classrooms)',
                children: <ClassroomTab courseId={id!} />
              },
              {
                key: 'materials',
                label: 'Tài liệu',
                children: <MaterialsTab courseId={id!} />
              },
              {
                key: 'assignments',
                label: 'Bài tập',
                children: <AssignmentsTab courseId={id!} />
              },
              {
                key: 'quizzes',
                label: 'Quizzes',
                children: <QuizzesTab courseId={id!} />
              }
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default ManageCourse;
