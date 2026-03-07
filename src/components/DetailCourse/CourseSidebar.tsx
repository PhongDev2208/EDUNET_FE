import React, { useState } from 'react';
import { Button, Image, Tag, Modal, Form, Input, Select, message, Tooltip, Typography, Avatar } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined, InstagramOutlined, FlagOutlined, HeartOutlined, HeartFilled, ShareAltOutlined, SafetyCertificateOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../utils/format';
import type { Course } from '../../models/course';

const { TextArea } = Input;
const { Text } = Typography;

interface CourseSidebarProps {
  course: Course;
}

const COURSE_REPORT_REASONS = [
  'Misleading course content',
  'Inappropriate content',
  'Copyright violation',
  'Poor quality or outdated',
  'Instructor not responding',
  'Technical issues',
  'Other',
];

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportForm] = Form.useForm();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleReportCourse = (values: any) => {
    console.log('Course report submitted:', values);
    message.success('Report submitted successfully. We will review it shortly.');
    setReportModalOpen(false);
    reportForm.resetFields();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
      {/* Course Preview Image */}
      <div className="rounded-xl overflow-hidden mb-6 relative group">
        <Image
          src={course.image}
          alt="Course"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button 
            type="primary" 
            shape="round" 
            className="opacity-0 group-hover:opacity-100 transition-opacity !bg-white !text-[#012643] !border-none"
          >
            Preview Course
          </Button>
        </div>
        
        {/* Wishlist & Share Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Tooltip title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
            <Button 
              shape="circle" 
              icon={isWishlisted ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="!bg-white/90 hover:!bg-white !border-none shadow-md"
            />
          </Tooltip>
          <Tooltip title="Share">
            <Button 
              shape="circle" 
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              className="!bg-white/90 hover:!bg-white !border-none shadow-md"
            />
          </Tooltip>
        </div>
      </div>

      {/* Price Section */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl font-bold text-[#e5698e]">
            {course.discountPrice ? formatCurrency(course.discountPrice) : formatCurrency(course.price)}
          </span>
          {course.discountPrice && (
            <Tag color="red" className="!rounded-full !text-sm">-38%</Tag>
          )}
        </div>
        {course.discountPrice && (
          <span className="text-gray-400 line-through text-lg">
            {formatCurrency(course.price)}
          </span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          type="primary" 
          size="large" 
          block 
          className="!h-14 !text-lg !font-semibold !bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Enroll Now
        </Button>
        <Button 
          size="large" 
          block 
          className="!h-12 !text-base !font-medium !border-[#012643] !text-[#012643] hover:!bg-[#012643] hover:!text-white !rounded-xl transition-all"
        >
          Add to Cart
        </Button>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-green-50 p-3 rounded-xl mb-6 flex items-center gap-3">
        <SafetyCertificateOutlined className="text-green-500 text-xl" />
        <Text className="text-green-700 text-sm">30-Day Money-Back Guarantee</Text>
      </div>

      {/* Course Info */}
      <div className="space-y-4 mb-6">
        <h4 className="font-bold text-[#012643]">This course includes:</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircleOutlined className="text-[#17EAD9]" />
            <span>{course.duration || '12h 30m'} on-demand video</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircleOutlined className="text-[#17EAD9]" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircleOutlined className="text-[#17EAD9]" />
            <span>Downloadable resources</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircleOutlined className="text-[#17EAD9]" />
            <span>Certificate of completion</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <CheckCircleOutlined className="text-[#17EAD9]" />
            <span>Lifetime access</span>
          </div>
        </div>
      </div>

      {/* Schedule Info */}
      <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 flex items-center gap-2">
            <ClockCircleOutlined className="text-[#e5698e]" /> Start Time
          </span>
          <span className="font-semibold text-[#012643]">{course.time?.startDisplay}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 flex items-center gap-2">
            <CalendarOutlined className="text-[#e5698e]" /> Schedule
          </span>
          <div className="flex gap-1">
            {course.schedule?.map(day => (
              <Tag key={day} color="blue" className="!rounded-full">{day}</Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Instructor Preview */}
      <div className="p-4 bg-gray-50 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <Avatar src={course.teacher?.avatar} size={48} />
          <div>
            <Text className="font-semibold text-[#012643] block">{course.teacher?.name}</Text>
            <Text className="text-gray-500 text-sm">Instructor</Text>
          </div>
        </div>
      </div>

      {/* Report Course Button */}
      <Button 
        type="text" 
        icon={<FlagOutlined />}
        onClick={() => setReportModalOpen(true)}
        className="!text-gray-400 hover:!text-red-500 w-full"
      >
        Report this course
      </Button>

      {/* Social Share */}
      <div className="flex justify-center gap-3 pt-6 border-t border-gray-100 mt-4">
        <Tooltip title="Share on Facebook">
          <Button shape="circle" icon={<FacebookOutlined />} className="!text-blue-600 !border-blue-100 hover:!bg-blue-50" />
        </Tooltip>
        <Tooltip title="Share on Twitter">
          <Button shape="circle" icon={<TwitterOutlined />} className="!text-sky-500 !border-sky-100 hover:!bg-sky-50" />
        </Tooltip>
        <Tooltip title="Share on YouTube">
          <Button shape="circle" icon={<YoutubeOutlined />} className="!text-red-600 !border-red-100 hover:!bg-red-50" />
        </Tooltip>
        <Tooltip title="Share on Instagram">
          <Button shape="circle" icon={<InstagramOutlined />} className="!text-pink-600 !border-pink-100 hover:!bg-pink-50" />
        </Tooltip>
      </div>

      {/* Report Course Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-red-500">
            <ExclamationCircleOutlined />
            <span>Report Course</span>
          </div>
        }
        open={reportModalOpen}
        onCancel={() => {
          setReportModalOpen(false);
          reportForm.resetFields();
        }}
        footer={null}
      >
        <Form form={reportForm} onFinish={handleReportCourse} layout="vertical">
          <p className="text-gray-500 mb-4">
            Help us maintain quality content. Please tell us what's wrong with this course.
          </p>
          
          <Form.Item 
            name="reason" 
            label="Reason for reporting"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Select placeholder="Select a reason">
              {COURSE_REPORT_REASONS.map(reason => (
                <Select.Option key={reason} value={reason}>{reason}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item 
            name="details" 
            label="Additional details"
            rules={[{ required: true, message: 'Please provide details' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Please describe the issue in detail. Include specific examples if possible..."
            />
          </Form.Item>
          
          <Form.Item 
            name="email" 
            label="Your email (for follow-up)"
          >
            <Input placeholder="optional@email.com" />
          </Form.Item>
          
          <div className="flex justify-end gap-3">
            <Button onClick={() => setReportModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" danger>
              Submit Report
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseSidebar;
