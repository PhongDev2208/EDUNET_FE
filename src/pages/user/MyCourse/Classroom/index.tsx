import React from 'react';
import { 
  Card, 
  Table, 
  Avatar, 
  Tag, 
  Button, 
  Input, 
  Modal, 
  Form, 
  Select, 
  Typography, 
  Space, 
  Popconfirm,
  Breadcrumb,
  Progress,
  Tooltip,
  Row,
  Col,
  Dropdown
} from 'antd';
import { 
  UserOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  MailOutlined,
  HomeOutlined,
  TeamOutlined,
  CrownOutlined,
  MoreOutlined,
  ExportOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { useClassroom } from '../../../../hooks';
import type { ClassMember } from '../../../../types/myCourse';

const { Title, Text } = Typography;

const Classroom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  
  const {
    userRole,
    filteredMembers,
    searchText,
    setSearchText,
    filterRole,
    setFilterRole,
    isModalOpen,
    editingMember,
    stats,
    getRoleConfig,
    handleAddMember,
    handleEditMember,
    handleDeleteMember,
    handleSubmit,
    closeModal,
  } = useClassroom();

  const onAddMember = () => {
    form.resetFields();
    handleAddMember();
  };

  const onEditMember = (member: ClassMember) => {
    form.setFieldsValue(member);
    handleEditMember(member);
  };

  const onSubmit = (values: any) => {
    handleSubmit(values);
    form.resetFields();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'teacher': return <CrownOutlined />;
      case 'assistant': return <UserOutlined />;
      case 'student':
      default: return <UserOutlined />;
    }
  };

  const columns = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: ClassMember) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} size={44} icon={<UserOutlined />} />
          <div>
            <div className="flex items-center gap-2">
              <Text className="font-semibold text-[#012643]">{record.name}</Text>
              {record.role === 'teacher' && <CrownOutlined className="text-yellow-500" />}
            </div>
            <Text className="text-gray-500 text-sm">{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const config = getRoleConfig(role);
        return (
          <Tag color={config.color} icon={getRoleIcon(role)} className="!rounded-full">
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number | undefined, record: ClassMember) => (
        record.role === 'student' && progress !== undefined ? (
          <div className="w-32">
            <Progress percent={progress} size="small" strokeColor="#17EAD9" />
          </div>
        ) : (
          <Text className="text-gray-400">-</Text>
        )
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'} className="!rounded-full">
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (date: string) => (
        <Text className="text-gray-500">{new Date(date).toLocaleDateString()}</Text>
      ),
    },
    ...(userRole === 'teacher' ? [{
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ClassMember) => (
        <Space>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEditMember(record)}
              className="!text-blue-500"
            />
          </Tooltip>
          <Tooltip title="Send Email">
            <Button 
              type="text" 
              icon={<MailOutlined />} 
              className="!text-green-500"
            />
          </Tooltip>
          {record.role !== 'teacher' && (
            <Popconfirm
              title="Remove this member?"
              description="This action cannot be undone."
              onConfirm={() => handleDeleteMember(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Remove">
                <Button type="text" icon={<DeleteOutlined />} className="!text-red-500" />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    }] : []),
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
            { title: <Link to={`/my-course/detail/${id}`}>Course Detail</Link> },
            { title: 'Classroom' },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Title level={2} className="!text-[#012643] !mb-1 flex items-center gap-3">
              <TeamOutlined className="text-blue-500" />
              Classroom Members
            </Title>
            <Text className="text-gray-500">Manage and view all class participants</Text>
          </div>
          {userRole === 'teacher' && (
            <div className="flex gap-3">
              <Dropdown
                menu={{
                  items: [
                    { key: 'export', label: 'Export Members', icon: <ExportOutlined /> },
                    { key: 'invite', label: 'Invite via Link', icon: <UserAddOutlined /> },
                  ]
                }}
              >
                <Button icon={<MoreOutlined />} className="!rounded-lg">More</Button>
              </Dropdown>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={onAddMember}
                className="!bg-[#012643] !border-[#012643] !rounded-lg"
              >
                Add Member
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#012643]">{stats.total}</div>
                <div className="text-gray-500 text-sm">Total Members</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{stats.teachers}</div>
                <div className="text-gray-500 text-sm">Instructors</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{stats.students}</div>
                <div className="text-gray-500 text-sm">Students</div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="rounded-xl border-0 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{stats.active}</div>
                <div className="text-gray-500 text-sm">Active</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters & Table */}
        <Card className="rounded-2xl border-0 shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by name or email..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="!rounded-lg sm:!w-64"
              allowClear
            />
            <Select
              value={filterRole}
              onChange={setFilterRole}
              className="sm:!w-40"
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'teacher', label: 'Instructor' },
                { value: 'assistant', label: 'Assistant' },
                { value: 'student', label: 'Student' },
              ]}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredMembers}
            rowKey="id"
            pagination={{ pageSize: 10, showTotal: (total) => `${total} members` }}
            className="custom-table"
          />
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          title={editingMember ? 'Edit Member' : 'Add New Member'}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={500}
        >
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="john@example.com" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select role' }]}
            >
              <Select
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'assistant', label: 'Assistant' },
                ]}
                placeholder="Select role"
              />
            </Form.Item>

            <Form.Item
              name="avatar"
              label="Avatar URL"
            >
              <Input placeholder="https://example.com/avatar.jpg" />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={closeModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!bg-[#012643]">
                {editingMember ? 'Update' : 'Add Member'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Classroom;
