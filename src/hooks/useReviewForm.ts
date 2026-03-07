import { Form, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useCreateReviewMutation } from '../services/courseApi';

export const useReviewForm = () => {
  const [form] = Form.useForm();
  const { id: courseId } = useParams<{ id: string }>();
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const handleFinishReview = async (values: { rate: number; title?: string; content: string }) => {
    if (!courseId) {
      message.error('Không tìm thấy khóa học');
      return;
    }

    try {
      await createReview({
        courseId,
        rating: values.rate,
        comment: values.content,
      }).unwrap();
      message.success('Đánh giá đã được gửi thành công!');
      form.resetFields();
    } catch {
      message.error('Không thể gửi đánh giá. Vui lòng thử lại.');
    }
  };

  return {
    form,
    handleFinishReview,
    isSubmitting,
  };
};
