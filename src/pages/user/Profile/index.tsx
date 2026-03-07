import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Avatar, 
  Button, 
  Form, 
  Input, 
  Select, 
  Typography, 
  Row, 
  Col,
  Tag,
  message,
  Modal,
  Table,
  Upload,
  Timeline,
  Empty
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined,
  EditOutlined,
  LockOutlined,
  TrophyOutlined,
  SafetyCertificateOutlined,
  QuestionCircleOutlined,
  CameraOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  GithubOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { 
  MOCK_USER_PROFILE, 
  MOCK_ACHIEVEMENTS, 
  MOCK_CERTIFICATES, 
  MOCK_SUPPORT_TICKETS,
  SUPPORT_CATEGORIES,
  TICKET_PRIORITIES
} from '../../../constants/profileData';
import type { SupportTicket } from '../../../types/profile';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [ticketForm] = Form.useForm();

  const handleEditProfile = () => {
    editForm.setFieldsValue(profile);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (values: any) => {
    setProfile({ ...profile, ...values });
    message.success('Profile updated successfully!');
    setIsEditModalOpen(false);
  };

  const handleChangePassword = (values: any) => {
    console.log('Password change:', values);
    message.success('Password changed successfully!');
    setIsPasswordModalOpen(false);
    passwordForm.resetFields();
  };

  const handleCreateTicket = (values: any) => {
    console.log('New ticket:', values);
    message.success('Support ticket submitted successfully!');
    setIsTicketModalOpen(false);
    ticketForm.resetFields();
  };

  const getTicketStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return { color: 'blue', icon: <ClockCircleOutlined />, text: 'Open' };
      case 'in-progress':
        return { color: 'orange', icon: <SyncOutlined spin />, text: 'In Progress' };
      case 'resolved':
        return { color: 'green', icon: <CheckCircleOutlined />, text: 'Resolved' };
      case 'closed':
        return { color: 'default', icon: <CheckCircleOutlined />, text: 'Closed' };
      default:
        return { color: 'default', icon: null, text: status };
    }
  };

  const ticketColumns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text className="font-mono text-[#012643]">{id}</Text>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string) => <Text className="font-medium">{subject}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const cat = SUPPORT_CATEGORIES.find(c => c.value === category);
        return <Tag>{cat?.label || category}</Tag>;
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const p = TICKET_PRIORITIES.find(pr => pr.value === priority);
        return <Tag color={p?.color}>{p?.label || priority}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = getTicketStatusConfig(status);
        return <Tag color={config.color} icon={config.icon}>{config.text}</Tag>;
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: SupportTicket) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => setSelectedTicket(record)}
        >
          View
        </Button>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'info',
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Personal Info
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Profile Header Card */}
          <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#012643] to-blue-700 -mx-6 -mt-6 px-6 py-8 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar 
                    src={profile.avatar} 
                    size={120} 
                    icon={<UserOutlined />}
                    className="!border-4 !border-white shadow-lg"
                  />
                  <Upload showUploadList={false}>
                    <Button 
                      type="primary" 
                      shape="circle" 
                      icon={<CameraOutlined />}
                      className="!absolute !bottom-0 !right-0 !bg-white !text-[#012643] !border-0 shadow-md"
                      size="small"
                    />
                  </Upload>
                </div>
                <div className="text-center md:text-left">
                  <Title level={2} className="!text-white !mb-1">
                    {profile.firstName} {profile.lastName}
                  </Title>
                  <Tag color="gold" className="!rounded-full !mb-2">
                    {profile.role === 'student' ? '👨‍🎓 Student' : '👨‍🏫 Teacher'}
                  </Tag>
                  <Text className="text-white/80 block">{profile.bio}</Text>
                  <div className="flex justify-center md:justify-start gap-3 mt-4">
                    {profile.socialLinks.facebook && (
                      <Button type="text" icon={<FacebookOutlined />} className="!text-white hover:!text-blue-300" />
                    )}
                    {profile.socialLinks.twitter && (
                      <Button type="text" icon={<TwitterOutlined />} className="!text-white hover:!text-blue-300" />
                    )}
                    {profile.socialLinks.linkedin && (
                      <Button type="text" icon={<LinkedinOutlined />} className="!text-white hover:!text-blue-300" />
                    )}
                    {profile.socialLinks.github && (
                      <Button type="text" icon={<GithubOutlined />} className="!text-white hover:!text-blue-300" />
                    )}
                  </div>
                </div>
                <div className="md:ml-auto">
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={handleEditProfile}
                    className="!bg-white !text-[#012643] !border-0 hover:!bg-gray-100"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MailOutlined className="text-[#e5698e] text-lg" />
                    <div>
                      <Text className="text-gray-500 text-xs block">Email</Text>
                      <Text className="font-medium">{profile.email}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneOutlined className="text-[#e5698e] text-lg" />
                    <div>
                      <Text className="text-gray-500 text-xs block">Phone</Text>
                      <Text className="font-medium">{profile.phone}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarOutlined className="text-[#e5698e] text-lg" />
                    <div>
                      <Text className="text-gray-500 text-xs block">Date of Birth</Text>
                      <Text className="font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</Text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <EnvironmentOutlined className="text-[#e5698e] text-lg" />
                    <div>
                      <Text className="text-gray-500 text-xs block">Address</Text>
                      <Text className="font-medium">{profile.address}, {profile.city}, {profile.country}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarOutlined className="text-[#e5698e] text-lg" />
                    <div>
                      <Text className="text-gray-500 text-xs block">Member Since</Text>
                      <Text className="font-medium">{new Date(profile.joinedDate).toLocaleDateString()}</Text>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Change Password */}
          <Card className="rounded-2xl border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <LockOutlined className="text-red-500 text-xl" />
                </div>
                <div>
                  <Text className="font-semibold text-[#012643] block">Password & Security</Text>
                  <Text className="text-gray-500 text-sm">Manage your password and security settings</Text>
                </div>
              </div>
              <Button 
                icon={<LockOutlined />}
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'achievements',
      label: (
        <span className="flex items-center gap-2">
          <TrophyOutlined />
          Achievements
        </span>
      ),
      children: (
        <div className="space-y-6">
          {/* Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-[#012643]">{MOCK_ACHIEVEMENTS.length}</div>
                  <div className="text-gray-500 text-sm">Achievements</div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-center">
                  <div className="text-3xl mb-2">📜</div>
                  <div className="text-2xl font-bold text-[#012643]">{MOCK_CERTIFICATES.length}</div>
                  <div className="text-gray-500 text-sm">Certificates</div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-[#012643]">30</div>
                  <div className="text-gray-500 text-sm">Day Streak</div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-[#012643]">1,250</div>
                  <div className="text-gray-500 text-sm">XP Points</div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Achievements Grid */}
          <Card className="rounded-2xl border-0 shadow-md">
            <Title level={4} className="!text-[#012643] !mb-4">🏆 My Achievements</Title>
            <Row gutter={[16, 16]}>
              {MOCK_ACHIEVEMENTS.map(achievement => (
                <Col xs={24} sm={12} md={8} key={achievement.id}>
                  <Card className="rounded-xl border border-gray-100 hover:shadow-md transition-all h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <Text className="font-semibold text-[#012643] block">{achievement.title}</Text>
                      <Text className="text-gray-500 text-sm">{achievement.description}</Text>
                      <div className="mt-2">
                        <Tag color="blue" className="!rounded-full !text-xs">
                          {new Date(achievement.earnedAt).toLocaleDateString()}
                        </Tag>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: 'certificates',
      label: (
        <span className="flex items-center gap-2">
          <SafetyCertificateOutlined />
          Certificates
        </span>
      ),
      children: (
        <Card className="rounded-2xl border-0 shadow-md">
          <Title level={4} className="!text-[#012643] !mb-4">📜 My Certificates</Title>
          {MOCK_CERTIFICATES.length === 0 ? (
            <Empty description="No certificates yet. Complete a course to earn your first certificate!" />
          ) : (
            <Row gutter={[16, 16]}>
              {MOCK_CERTIFICATES.map(cert => (
                <Col xs={24} md={12} key={cert.id}>
                  <Card className="rounded-xl border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                        <SafetyCertificateOutlined />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text className="font-semibold text-[#012643] block text-lg">{cert.courseName}</Text>
                        <Text className="text-gray-500 text-sm block">Credential ID: {cert.credentialId}</Text>
                        <div className="flex items-center gap-4 mt-2">
                          <Text className="text-xs text-gray-400">
                            Issued: {new Date(cert.issueDate).toLocaleDateString()}
                          </Text>
                          {cert.expiryDate && (
                            <Text className="text-xs text-orange-500">
                              Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                            </Text>
                          )}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="small" icon={<EyeOutlined />} className="!rounded-lg">View</Button>
                          <Button size="small" icon={<DownloadOutlined />} type="primary" className="!bg-[#012643] !rounded-lg">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card>
      ),
    },
    {
      key: 'support',
      label: (
        <span className="flex items-center gap-2">
          <QuestionCircleOutlined />
          Support Tickets
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card className="rounded-2xl border-0 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <Title level={4} className="!text-[#012643] !mb-1">Support Tickets</Title>
                <Text className="text-gray-500">View and manage your support requests</Text>
              </div>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsTicketModalOpen(true)}
                className="!bg-[#012643] !rounded-lg"
              >
                New Ticket
              </Button>
            </div>

            <Table
              columns={ticketColumns}
              dataSource={MOCK_SUPPORT_TICKETS}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 lg:px-6">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="profile-tabs"
        />

        {/* Edit Profile Modal */}
        <Modal
          title="Edit Profile"
          open={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          footer={null}
          width={600}
        >
          <Form form={editForm} layout="vertical" onFinish={handleSaveProfile}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item name="bio" label="Bio">
              <TextArea rows={3} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="city" label="City">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="country" label="Country">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!bg-[#012643]">Save Changes</Button>
            </div>
          </Form>
        </Modal>

        {/* Change Password Modal */}
        <Modal
          title="Change Password"
          open={isPasswordModalOpen}
          onCancel={() => setIsPasswordModalOpen(false)}
          footer={null}
          width={400}
        >
          <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
            <Form.Item 
              name="currentPassword" 
              label="Current Password" 
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item 
              name="newPassword" 
              label="New Password" 
              rules={[
                { required: true },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item 
              name="confirmPassword" 
              label="Confirm Password" 
              dependencies={['newPassword']}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsPasswordModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!bg-[#012643]">Change Password</Button>
            </div>
          </Form>
        </Modal>

        {/* Create Ticket Modal */}
        <Modal
          title="Create Support Ticket"
          open={isTicketModalOpen}
          onCancel={() => setIsTicketModalOpen(false)}
          footer={null}
          width={500}
        >
          <Form form={ticketForm} layout="vertical" onFinish={handleCreateTicket}>
            <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
              <Input placeholder="Brief description of your issue" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                  <Select options={SUPPORT_CATEGORIES} placeholder="Select category" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                  <Select options={TICKET_PRIORITIES.map(p => ({ value: p.value, label: p.label }))} placeholder="Select priority" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={4} placeholder="Please provide details about your issue..." />
            </Form.Item>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsTicketModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="!bg-[#012643]">Submit Ticket</Button>
            </div>
          </Form>
        </Modal>

        {/* View Ticket Modal */}
        <Modal
          title={`Ticket: ${selectedTicket?.id}`}
          open={!!selectedTicket}
          onCancel={() => setSelectedTicket(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedTicket(null)}>Close</Button>
          ]}
          width={600}
        >
          {selectedTicket && (
            <div className="space-y-4">
              <div>
                <Text className="text-gray-500 text-sm">Subject</Text>
                <Title level={5} className="!mt-0">{selectedTicket.subject}</Title>
              </div>
              <Row gutter={16}>
                <Col span={8}>
                  <Text className="text-gray-500 text-sm">Status</Text>
                  <div>
                    <Tag color={getTicketStatusConfig(selectedTicket.status).color}>
                      {getTicketStatusConfig(selectedTicket.status).text}
                    </Tag>
                  </div>
                </Col>
                <Col span={8}>
                  <Text className="text-gray-500 text-sm">Category</Text>
                  <div>{SUPPORT_CATEGORIES.find(c => c.value === selectedTicket.category)?.label}</div>
                </Col>
                <Col span={8}>
                  <Text className="text-gray-500 text-sm">Priority</Text>
                  <div>
                    <Tag color={TICKET_PRIORITIES.find(p => p.value === selectedTicket.priority)?.color}>
                      {TICKET_PRIORITIES.find(p => p.value === selectedTicket.priority)?.label}
                    </Tag>
                  </div>
                </Col>
              </Row>
              <div>
                <Text className="text-gray-500 text-sm">Description</Text>
                <Paragraph className="bg-gray-50 p-3 rounded-lg mt-1">{selectedTicket.description}</Paragraph>
              </div>
              {selectedTicket.responses.length > 0 && (
                <div>
                  <Text className="text-gray-500 text-sm">Responses</Text>
                  <Timeline className="mt-2">
                    {selectedTicket.responses.map(response => (
                      <Timeline.Item 
                        key={response.id}
                        color={response.isStaff ? 'blue' : 'green'}
                      >
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Text className="font-medium">{response.authorName}</Text>
                            <Text className="text-xs text-gray-400">
                              {new Date(response.createdAt).toLocaleString()}
                            </Text>
                          </div>
                          <Paragraph className="!mb-0">{response.message}</Paragraph>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Profile;