import React, { useState } from 'react';
import { Form, Input, Button, Steps, Select, message, InputNumber, Upload, Typography } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, BookOutlined, UploadOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo.png';
import { useRegisterMutation } from '../../../../services/authApi';
import { setTokens } from '../../../../services/axiosBaseQuery';

const { Option } = Select;
const { Title, Text } = Typography;

const RegisterTeacher: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [fileList, setFileList] = useState<import('antd/es/upload/interface').UploadFile[]>([]);
  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: Record<string, unknown>) => {
    const newData = { ...formData, ...values };
    setFormData(newData);
    
    if (current < 2) {
      setCurrent(current + 1);
    } else {
      // Submit registration to backend API
      try {
        const nameParts = (newData.name as string || '').trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const result = await register({
          email: newData.email as string,
          password: newData.password as string,
          firstName,
          lastName,
          phone: (newData.phone as string) || undefined,
          role: 'teacher',
        }).unwrap();

        if (result.success && result.data) {
          setTokens(result.data.accessToken, result.data.refreshToken);
          message.success('Đăng ký thành công! Đang chuyển hướng...');
          setCurrent(current + 1);
          // Redirect to home after showing success step
          setTimeout(() => navigate('/'), 3000);
        } else {
          message.error('Đăng ký thất bại. Vui lòng thử lại.');
        }
      } catch (err: unknown) {
        const errorData = (err as { data?: { message?: string | { errors?: Record<string, string> } } })?.data;
        let errorMessage = 'Đăng ký thất bại';
        if (typeof errorData?.message === 'string') {
          errorMessage = errorData.message;
        } else if (typeof errorData?.message === 'object' && errorData.message?.errors) {
          errorMessage = Object.values(errorData.message.errors).join('. ');
        }
        message.error(errorMessage);
      }
    }
  };

  const steps = [
    {
      title: 'Tài khoản',
      content: (
        <>
          <Form.Item
            name="email"
            label="Email"
            className="!mb-3"
            rules={[
              { required: true, message: 'Vui lòng nhập Email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Nhập email của bạn" className="!rounded-lg !h-9" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            className="!mb-3"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Tạo mật khẩu" className="!rounded-lg !h-9" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            className="!mb-0"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Xác nhận mật khẩu" className="!rounded-lg !h-9" />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Cá nhân',
      content: (
        <>
          <Form.Item
            name="name"
            label="Họ tên"
            className="!mb-3"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Nhập họ tên đầy đủ" className="!rounded-lg !h-9" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            className="!mb-3"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Nhập số điện thoại" className="!rounded-lg !h-9" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Tuổi"
            className="!mb-0"
            rules={[{ required: true, message: 'Vui lòng nhập tuổi!' }]}
          >
            <InputNumber placeholder="Nhập tuổi" className="!w-full !rounded-lg" min={18} max={100} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Chuyên môn',
      content: (
        <>
          <Form.Item
            name="major"
            label="Lĩnh vực chuyên môn"
            className="!mb-3"
            rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực chuyên môn!' }]}
          >
            <Input prefix={<BookOutlined className="text-gray-400" />} placeholder="VD: Lập trình Web, Khoa học dữ liệu" className="!rounded-lg !h-9" />
          </Form.Item>
          <Form.Item
            name="degree"
            label="Bằng cấp cao nhất"
            className="!mb-3"
            initialValue="University"
            rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}
          >
            <Select placeholder="Chọn bằng cấp cao nhất" className="!rounded-lg">
              <Option value="Bachelor">Cử nhân</Option>
              <Option value="Master">Thạc sĩ</Option>
              <Option value="PhD">Tiến sĩ</Option>
              <Option value="Other">Chứng chỉ chuyên môn khác</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tải lên CV/Hồ sơ (tùy chọn)" className="!mb-0">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              beforeUpload={() => false}
              maxCount={1}
              className="upload-cv"
            >
              {fileList.length < 1 && (
                <div className="text-center">
                  <UploadOutlined className="text-2xl text-gray-400" />
                  <div className="mt-2 text-gray-500">Tải lên CV</div>
                </div>
              )}
            </Upload>
            <Text className="text-gray-400 text-xs">Định dạng PDF, DOC hoặc ảnh (Tối đa 5MB)</Text>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Hoàn thành',
      content: (
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleOutlined className="text-5xl text-green-500" />
          </div>
          <Title level={3} className="!text-green-600 !mb-2">Đăng ký thành công!</Title>
          <Text className="text-gray-500 block mb-6 max-w-sm mx-auto">
            Tài khoản giảng viên của bạn đã được tạo. Bạn sẽ được chuyển hướng đến trang chủ.
          </Text>
          <Link to="/">
            <Button type="primary" size="large" className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg !px-8">
              Đi đến trang chủ
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#012643] via-[#01385f] to-[#012643] items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#17EAD9] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6078EA] rounded-full opacity-10 translate-y-1/2 -translate-x-1/2 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#e5698e] rounded-full opacity-10 blur-3xl animate-pulse delay-500"></div>

        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#17EAD9] rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-[#6078EA] rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 left-16 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-500"></div>

        <div className="z-10 text-center p-8 max-w-lg">
          <div className="mb-5 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#17EAD9] to-[#6078EA] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <img src={Logo} alt="EduNet" className="w-20 h-20 rounded-2xl shadow-2xl relative z-10 border-4 border-white/10" />
          </div>
          <Title level={2} className="!text-white !mb-3 !text-3xl !font-bold">
            Trở thành <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#17EAD9] to-[#6078EA]">Giảng viên</span>
          </Title>
          <p className="text-blue-200 text-base mb-6">
            Chia sẻ kiến thức với hàng nghìn học viên. Tham gia cộng đồng giảng viên chuyên gia của chúng tôi.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        <div className="w-full max-w-xl bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-3 lg:hidden">
             <img src={Logo} alt="EduNet" className="w-12 h-12 rounded-full mb-2 mx-auto" />
             <Title level={4} className="!text-[#012643] !mb-0">EduNet</Title>
          </div>

          <div className="mb-3">
            <Title level={3} className="!text-[#012643] !mb-1">Đăng ký giảng viên</Title>
            <Text className="text-gray-500">Hoàn thành các bước dưới đây để đăng ký làm giảng viên.</Text>
          </div>

          <Steps current={current} className="mb-4" size="small" items={steps.map(s => ({ title: s.title }))} />

          <Form
            form={form}
            name="register-teacher"
            onFinish={onFinish}
            layout="vertical"
            initialValues={formData}
          >
            <div className="min-h-[140px]">
              {steps[current].content}
            </div>

            {current < 3 && (
              <div className="flex justify-between mt-3 gap-4">
                {current > 0 && (
                  <Button onClick={() => setCurrent(current - 1)} className="!rounded-lg">
                    Quay lại
                  </Button>
                )}
                {current === 0 && <div></div>}
                
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={current === 2 && isLoading}
                  className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg !px-8"
                >
                  {current === 2 ? 'Gửi đơn đăng ký' : 'Tiếp tục'}
                </Button>
              </div>
            )}
          </Form>

          <div className="text-center mt-3 pt-3 border-t border-gray-100">
            <Text className="text-gray-500 text-sm">
              Đã có tài khoản? 
              <Link to="/auth/login" className="text-[#e5698e] ml-1 font-medium hover:underline">Đăng nhập</Link>
            </Text>
          </div>

          <div className="text-center mt-1">
             <a href="mailto:support@edunet.com" className="inline-flex items-center gap-2 text-gray-500 text-xs hover:text-[#012643] transition-colors">
                <MailOutlined /> Cần giúp đỡ? Liên hệ hỗ trợ
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;