import React, { useState } from 'react';
import { Row, Col, Pagination, Empty, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CourseCard from '../common/CourseCard';
import type { Course } from '../../models/course';

const { Text } = Typography;

interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  view?: 'grid' | 'list';
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, loading = false, view = 'grid' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spin indicator={<LoadingOutlined className="text-4xl text-[#e5698e]" spin />} />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <Empty
          description={
            <div className="mt-4">
              <Text className="text-gray-500 text-lg">No courses found</Text>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <>
      <Row gutter={[24, 24]}>
        {paginatedCourses.map((course) => (
          <Col 
            xs={24} 
            md={view === 'list' ? 24 : 12} 
            xl={view === 'list' ? 24 : 8} 
            key={course.id}
          >
            <CourseCard course={course} layout={view === 'list' ? 'horizontal' : 'vertical'} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm">
        <Text className="text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, courses.length)} of {courses.length} courses
        </Text>
        <Pagination 
          current={currentPage}
          total={courses.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
          className="custom-pagination"
        />
      </div>
    </>
  );
};

export default CourseGrid;
