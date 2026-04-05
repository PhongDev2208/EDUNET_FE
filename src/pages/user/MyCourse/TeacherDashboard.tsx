import React, { useState } from 'react';
import { Card, Button, Typography, Row, Col, Spin, Empty, Tag, Modal, Form, Input, Select, InputNumber, DatePicker, message } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../../../services/authApi';
import { useGetCoursesQuery, useCreateCourseMutation, useUpdateCourseMutation, useGetCategoriesQuery } from '../../../services/courseApi';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const TeacherDashboard: React.FC = () => {
  const { data: profileResponse } = useGetProfileQuery();
  const user = profileResponse?.data;
  const isTeacher = user?.role === 'teacher';

  const { data: coursesData, isLoading, refetch } = useGetCoursesQuery({
    // Usually backend will have some filter logic.
    // 'filter.teacherId': `$eq:${user?.id}` or similar if supported.
    // We fetch all for now, but in a real case we might use custom endpoint or proper filter string.
  });
  
  const { data: categoriesData } = useGetCategoriesQuery();

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const myCourses = coursesData?.data?.rows?.filter(course => course.teacherId === user?.id) || [];

  const handleOpenModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        ...record,
        startDate: record.startDate ? dayjs(record.startDate) : undefined,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        price: values.price ? Number(values.price) : 0,
        discountPrice: values.discountPrice ? Number(values.discountPrice) : undefined,
        totalLessons: values.totalLessons ? Number(values.totalLessons) : 0,
        startDate: values.startDate ? values.startDate.toISOString() : undefined,
      };

      if (editingId) {
        await updateCourse({ id: editingId, data: payload }).unwrap();
        message.success('Cập nhật thành công');
      } else {
        await createCourse({
          ...payload,
          teacherId: user?.id,
          status: 'draft',
        }).unwrap();
        message.success('Tạo khóa học thành công');
      }
      setIsModalVisible(false);
      refetch();
    } catch (error) {
      console.error('Failed to save course:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  if (!isTeacher) {
    return <Empty description="Bạn không có quyền truy cập." />;
  }

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Title level={2} className="!text-[#012643] !mb-2">Quản lý khóa học (Giảng viên)</Title>
            <Text className="text-gray-500 text-lg">Tạo và quản lý các khóa học của bạn</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            className="!bg-[#17EAD9] !border-none hover:!opacity-80 text-[#012643]"
            onClick={() => handleOpenModal()}
          >
            Tạo khóa học
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" tip="Đang tải danh sách..." />
          </div>
        ) : myCourses.length === 0 ? (
          <Card className="rounded-2xl border-0 shadow-md">
            <Empty 
              description="Bạn chưa tạo khóa học nào."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => handleOpenModal()} className="!bg-[#012643]">
                Tạo khóa học đầu tiên
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {myCourses.map(course => (
              <Col xs={24} sm={12} lg={8} key={course.id}>
                <Card 
                  className="h-full rounded-2xl overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
                  cover={
                    <div className="h-44 relative bg-gray-200">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Không có ảnh</div>
                      )}
                      <Tag color={course.status === 'published' ? 'green' : 'orange'} className="!absolute top-3 right-3 !rounded-full">
                        {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </Tag>
                    </div>
                  }
                  actions={[
                    <Button 
                      key="edit"
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => handleOpenModal(course)}
                    >
                      Sửa
                    </Button>,
                    <Link to={`/my-course/manage-course/${course.id}`} key="manage">
                      <Button type="text" icon={<SettingOutlined />} className="text-blue-500 hover:text-blue-700">
                        Nội dung
                      </Button>
                    </Link>
                  ]}
                >
                  <Title level={5} className="!line-clamp-2 !mb-2">{course.title}</Title>
                  <Text type="secondary" className="block mb-2">Giá: {course.price.toLocaleString()} VNĐ</Text>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.totalLessons} bài học</span>
                    <span>Tạo: {dayjs(course.createdAt).format('DD/MM/YYYY')}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        title={editingId ? "Cập nhật khóa học" : "Tạo khóa học mới"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="title" label="Tên khóa học" rules={[{ required: true }]}>
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea placeholder="Nhập mô tả khóa học" rows={3} />
          </Form.Item>

          <Form.Item name="thumbnail" label="URL Ảnh đại diện">
            <Input placeholder="https://example.com/image.png" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price" label="Giá (VNĐ)" initialValue={0} rules={[{ required: true }]}>
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discountPrice" label="Giá KM (VNĐ)">
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="categoryId" label="Danh mục">
                <Select placeholder="Chọn danh mục" allowClear>
                  {categoriesData?.data?.rows?.map((cat) => (
                    <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="level" label="Cấp độ" initialValue="beginner">
                <Select>
                  <Option value="beginner">Mới bắt đầu</Option>
                  <Option value="intermediate">Trung bình</Option>
                  <Option value="advanced">Nâng cao</Option>
                  <Option value="all">Tất cả</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="duration" label="Thời lượng (vd: '20 giờ')">
                <Input placeholder="Khoảng thời gian" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="totalLessons" label="Tổng số bài dự kiến" initialValue={0}>
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="language" label="Ngôn ngữ" initialValue="Vietnamese">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="startDate" label="Ngày bắt đầu">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="tags" label="Tags">
            <Select mode="tags" placeholder="Nhập tags..." />
          </Form.Item>
          
          <Form.Item name="schedule" label="Lịch học">
            <Select mode="tags" placeholder="Nhập lịch học (vd: Thứ 2, Thứ 4)..." />
          </Form.Item>
          
          <Form.Item name="goal" label="Mục tiêu khóa học">
            <Input.TextArea rows={2} placeholder="Các mục tiêu đạt được..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full !bg-[#012643]" loading={isCreating || isUpdating}>
              {editingId ? 'Cập nhật khóa học' : 'Tạo khóa học'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherDashboard;
