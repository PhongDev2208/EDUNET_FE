import React from 'react';
import { Typography, Avatar, Rate, Card } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const { Title, Paragraph, Text } = Typography;

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'UX Designer at Google',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    comment: "EduNet has completely transformed my career. The courses are well-structured and the instructors are top-notch. I highly recommend it to anyone looking to upskill.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Developer at Meta',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    comment: "The practical projects in the web development course helped me build a portfolio that got me hired. The community support is also amazing.",
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Marketing Lead at Spotify',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    comment: "Great content and flexible learning schedule. I could learn at my own pace while working full-time. The marketing strategies I learned were immediately applicable.",
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Data Scientist at Netflix',
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    rating: 5,
    comment: "The data science track is comprehensive and easy to follow. The hands-on labs made complex concepts simple to understand.",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#17EAD9]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#e5698e]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-2 bg-[#6078EA]/10 rounded-full mb-4">
            <span className="text-[#6078EA] font-semibold">💬 Testimonials</span>
          </div>
          <Title level={2} className="!text-3xl md:!text-4xl !font-bold !mb-4 !text-[#012643]">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5698e] to-[#6078EA]">Thousands</span> of Students
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our community of learners who have achieved their goals.
          </Paragraph>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <Card 
                  className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                  bodyStyle={{ padding: 0 }}
                >
                  <div className="bg-gradient-to-r from-[#012643] to-blue-800 p-6 relative">
                    <div className="absolute top-4 right-4 text-white/20 text-5xl">"</div>
                    <div className="flex items-center gap-4">
                      <Avatar 
                        src={item.avatar} 
                        size={64} 
                        className="!border-4 !border-white/20"
                      />
                      <div>
                        <Text className="font-bold text-white block text-lg">{item.name}</Text>
                        <Text className="text-blue-200 text-sm">{item.role}</Text>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <Rate disabled defaultValue={item.rating} className="!text-[#FFCE00]" />
                    </div>
                    <Paragraph className="text-gray-600 text-base leading-relaxed mb-0">
                      "{item.comment}"
                    </Paragraph>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
