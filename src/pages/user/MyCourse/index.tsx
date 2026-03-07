import React from 'react';
import { Card, Button, Input, Select, Tag, Typography, Progress, Empty, Segmented, Row, Col, Avatar } from 'antd';
import { 
  EyeOutlined, 
  PlayCircleOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
  TrophyOutlined,
  BookOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMyCourse } from '../../../hooks';

const { Title, Text } = Typography;

const MyCourse: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    filterStatus,
    setFilterStatus,
    searchText,
    setSearchText,
    filteredCourses,
    stats,
    getStatusConfig,
  } = useMyCourse();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'learning': return <PlayCircleOutlined />;
      case 'completed': return <CheckCircleOutlined />;
      case 'pending': return <ClockCircleOutlined />;
      default: return null;
    }
  };

  const renderGridView = () => (
    <Row gutter={[24, 24]}>
      {filteredCourses.map(course => {
        const statusConfig = getStatusConfig(course.status);
        return (
          <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
            <Card 
              className="h-full rounded-2xl overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group"
              cover={
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Tag 
                    color={statusConfig.color as any}
                    className="!absolute top-3 left-3 !rounded-full !px-3 !py-1 !border-0"
                    icon={getStatusIcon(course.status)}
                  >
                    {statusConfig.text}
                  </Tag>
                  {course.status === 'learning' && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <Progress 
                        percent={course.progress} 
                        size="small" 
                        strokeColor="#17EAD9" 
                        trailColor="rgba(255,255,255,0.3)"
                        format={() => <span className="text-white text-xs">{course.progress}%</span>}
                      />
                    </div>
                  )}
                </div>
              }
              bodyStyle={{ padding: '16px' }}
            >
              <div className="mb-3">
                <Tag color="blue" className="!rounded-full !text-xs !mb-2">{course.category}</Tag>
                <Title level={5} className="!text-[#012643] !mb-1 !line-clamp-2 !leading-tight">
                  {course.title}
                </Title>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <UserOutlined />
                  <span>{course.teacher}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BookOutlined />
                  {course.lessons} lessons
                </span>
                {course.status === 'completed' && course.completedDate && (
                  <span className="flex items-center gap-1 text-green-500">
                    <TrophyOutlined />
                    Completed
                  </span>
                )}
              </div>

              {course.status === 'learning' && course.nextLesson && (
                <div className="bg-blue-50 p-3 rounded-xl mb-4">
                  <Text className="text-xs text-blue-600 font-medium">Next Lesson:</Text>
                  <Text className="block text-sm text-[#012643] font-semibold truncate">{course.nextLesson}</Text>
                  <Text className="text-xs text-gray-500">{course.nextLessonTime}</Text>
                </div>
              )}

              {course.status === 'pending' && course.startDate && (
                <div className="bg-orange-50 p-3 rounded-xl mb-4">
                  <Text className="text-xs text-orange-600 font-medium flex items-center gap-1">
                    <CalendarOutlined /> Starts on
                  </Text>
                  <Text className="block text-sm text-[#012643] font-semibold">{course.startDate}</Text>
                </div>
              )}

              <div className="flex gap-2">
                <Link to={`/my-course/detail/${course.id}`} className="flex-1">
                  <Button 
                    type="primary" 
                    block
                    icon={<EyeOutlined />}
                    className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg"
                  >
                    View
                  </Button>
                </Link>
                {course.status === 'learning' && (
                  <Button 
                    type="default"
                    icon={<PlayCircleOutlined />}
                    className="!border-[#17EAD9] !text-[#17EAD9] hover:!bg-[#17EAD9] hover:!text-white !rounded-lg"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredCourses.map(course => {
        const statusConfig = getStatusConfig(course.status);
        return (
          <Card 
            key={course.id}
            className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-all duration-300"
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-64 h-48 md:h-auto overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <Tag 
                  color={statusConfig.color as any}
                  className="!absolute top-3 left-3 !rounded-full !px-3 !py-1 !border-0"
                  icon={getStatusIcon(course.status)}
                >
                  {statusConfig.text}
                </Tag>
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <Tag color="blue" className="!rounded-full !text-xs !mb-2">{course.category}</Tag>
                    <Title level={4} className="!text-[#012643] !mb-2">{course.title}</Title>
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                      <span className="flex items-center gap-2">
                        <Avatar size="small" src={`https://randomuser.me/api/portraits/men/${course.id}.jpg`} />
                        {course.teacher}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOutlined />
                        {course.lessons} lessons
                      </span>
                    </div>

                    {course.status === 'learning' && (
                      <div className="max-w-md">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-semibold text-[#012643]">{course.progress}%</span>
                        </div>
                        <Progress 
                          percent={course.progress} 
                          strokeColor={{ '0%': '#17EAD9', '100%': '#012643' }}
                          showInfo={false}
                        />
                        {course.nextLesson && (
                          <div className="mt-3 text-sm">
                            <span className="text-gray-500">Next: </span>
                            <span className="text-[#012643] font-medium">{course.nextLesson}</span>
                            <span className="text-gray-400 ml-2">• {course.nextLessonTime}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    <Link to={`/my-course/detail/${course.id}`}>
                      <Button 
                        type="primary" 
                        icon={<EyeOutlined />}
                        className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg"
                      >
                        View Details
                      </Button>
                    </Link>
                    {course.status === 'learning' && (
                      <Button 
                        type="default"
                        icon={<PlayCircleOutlined />}
                        className="!border-[#17EAD9] !text-[#17EAD9] hover:!bg-[#17EAD9] hover:!text-white !rounded-lg"
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="!text-[#012643] !mb-2">My Learning</Title>
          <Text className="text-gray-500 text-lg">Track your progress and continue learning</Text>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-blue-100 text-sm">Total Courses</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.inProgress}</div>
                <div className="text-cyan-100 text-sm">In Progress</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.completed}</div>
                <div className="text-green-100 text-sm">Completed</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-orange-400 to-amber-500 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.notStarted}</div>
                <div className="text-orange-100 text-sm">Not Started</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="rounded-2xl border-0 shadow-md mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <Input
                placeholder="Search courses..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="!w-64 !rounded-lg"
                allowClear
              />
              <Select 
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 150 }}
                className="!rounded-lg"
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'learning', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'pending', label: 'Not Started' },
                ]}
              />
            </div>
            
            <Segmented
              value={viewMode}
              onChange={setViewMode}
              options={[
                { value: 'grid', icon: <AppstoreOutlined /> },
                { value: 'list', icon: <BarsOutlined /> },
              ]}
            />
          </div>
        </Card>

        {/* Course List */}
        {filteredCourses.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-md">
            <Empty 
              description="No courses found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Link to="/courses">
                <Button type="primary" className="!bg-[#012643]">Browse Courses</Button>
              </Link>
            </Empty>
          </Card>
        ) : (
          viewMode === 'grid' ? renderGridView() : renderListView()
        )}
      </div>
    </div>
  );
};

export default MyCourse;
