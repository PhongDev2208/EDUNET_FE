import React, { useState } from 'react';
import { Form, Input, Button, Steps, Select, message, InputNumber, Upload, Typography } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, BookOutlined, UploadOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/images/Logo.png';

const { Option } = Select;
const { Title, Text } = Typography;

const RegisterTeacher: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    const newData = { ...formData, ...values };
    setFormData(newData);
    
    if (current < 2) {
      setCurrent(current + 1);
    } else {
      console.log('Final Data:', newData);
      console.log('CV File:', fileList);
      
      if (fileList.length === 0) {
        message.error('Please upload your CV!');
        return;
      }

      message.success('Registration successful! We will contact you soon.');
      setCurrent(current + 1);
    }
  };

  const steps = [
    {
      title: 'Account',
      content: (
        <>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your email" className="!rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Create a password" className="!rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm your password" className="!rounded-lg" size="large" />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Personal',
      content: (
        <>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your Full Name!' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your full name" className="!rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Enter your phone number" className="!rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please input your Age!' }]}
          >
            <InputNumber placeholder="Enter your age" size="large" className="!w-full !rounded-lg" min={18} max={100} />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Professional',
      content: (
        <>
          <Form.Item
            name="major"
            label="Area of Expertise"
            rules={[{ required: true, message: 'Please input your Major!' }]}
          >
            <Input prefix={<BookOutlined className="text-gray-400" />} placeholder="e.g. Web Development, Data Science" className="!rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="degree"
            label="Highest Degree"
            initialValue="University"
            rules={[{ required: true, message: 'Please select your Degree!' }]}
          >
            <Select size="large" placeholder="Select your highest degree" className="!rounded-lg">
              <Option value="Bachelor">Bachelor's Degree</Option>
              <Option value="Master">Master's Degree</Option>
              <Option value="PhD">PhD / Doctorate</Option>
              <Option value="Other">Other Professional Certification</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Your CV/Resume" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
              className="upload-cv"
            >
              {fileList.length < 1 && (
                <div className="text-center">
                  <UploadOutlined className="text-2xl text-gray-400" />
                  <div className="mt-2 text-gray-500">Upload CV</div>
                </div>
              )}
            </Upload>
            <Text className="text-gray-400 text-xs">PDF, DOC, or image format (Max 5MB)</Text>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Done',
      content: (
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleOutlined className="text-5xl text-green-500" />
          </div>
          <Title level={3} className="!text-green-600 !mb-2">Application Submitted!</Title>
          <Text className="text-gray-500 block mb-6 max-w-sm mx-auto">
            Thank you for applying to become an instructor. Our team will review your application and contact you within 5-7 business days.
          </Text>
          <Link to="/auth/login">
            <Button type="primary" size="large" className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg !px-8">
              Go to Login
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#012643] items-center justify-center relative overflow-hidden">
        <div className="z-10 text-center p-12">
          <img src={Logo} alt="EduNet" className="w-28 h-28 rounded-full mb-6 mx-auto shadow-lg" />
          <Title level={2} className="!text-white !mb-4">Become an Instructor</Title>
          <Text className="text-blue-200 text-base block max-w-sm mx-auto">
            Share your knowledge with thousands of students. Join our community of expert educators.
          </Text>
        </div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#6078EA] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#17EAD9] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-6 lg:hidden">
             <img src={Logo} alt="EduNet" className="w-14 h-14 rounded-full mb-2 mx-auto" />
             <Title level={3} className="!text-[#012643] !mb-0">EduNet</Title>
          </div>

          <div className="mb-6">
            <Title level={3} className="!text-[#012643] !mb-1">Teacher Application</Title>
            <Text className="text-gray-500">Complete the steps below to apply as an instructor.</Text>
          </div>

          <Steps current={current} className="mb-8" size="small" items={steps.map(s => ({ title: s.title }))} />

          <Form
            form={form}
            name="register-teacher"
            onFinish={onFinish}
            layout="vertical"
            initialValues={formData}
            size="large"
          >
            <div className="min-h-[280px]">
              {steps[current].content}
            </div>

            {current < 3 && (
              <div className="flex justify-between mt-6 gap-4">
                {current > 0 && (
                  <Button onClick={() => setCurrent(current - 1)} size="large" className="!rounded-lg">
                    Previous
                  </Button>
                )}
                {current === 0 && <div></div>}
                
                <Button type="primary" htmlType="submit" size="large" className="!bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-lg !px-8">
                  {current === 2 ? 'Submit Application' : 'Continue'}
                </Button>
              </div>
            )}
          </Form>

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <Text className="text-gray-500">
              Already have an account? 
              <Link to="/auth/login" className="text-[#e5698e] ml-1 font-medium hover:underline">Login</Link>
            </Text>
          </div>

          <div className="text-center mt-4">
             <a href="mailto:support@edunet.com" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#012643] transition-colors">
                <MailOutlined /> Need help? Contact Support
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;