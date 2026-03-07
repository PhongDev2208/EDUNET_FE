import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MailOutlined, 
  FacebookFilled, 
  TwitterOutlined, 
  YoutubeFilled, 
  SendOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Drawer } from 'antd';

import Logo from '../../assets/images/Logo.png';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Mock login state

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Courses', path: '/courses' },
    { title: 'MyCourse', path: '/my-course' },
    { title: 'Schedule', path: '/schedule' },
    { title: 'Chats', path: '/chat' },
  ];

  const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#30C2EC] hover:text-white hover:border-[#30C2EC] transition-all duration-300"
    >
      {icon}
    </a>
  );

  return (
    <header className="bg-white sticky top-0 z-50" style={{ boxShadow: "#88a5bf7a 6px 2px 16px, #fffc -6px -2px 16px" }}>
      {/* Top Bar */}
      <div className="border-b border-gray-100 py-2 hidden md:block">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MailOutlined className="text-[#30C2EC]" />
              <span>nhutphigenz@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <SocialLink href="https://instagram.com" icon={<FacebookFilled />} />
              <SocialLink href="https://twitter.com" icon={<TwitterOutlined />} />
              <SocialLink href="https://youtube.com" icon={<YoutubeFilled />} />
              <SocialLink href="https://telegram.org" icon={<SendOutlined />} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={Logo} 
                alt="EduNet" 
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="text-[#30C2EC] text-3xl font-bold font-roboto mt-1">EduNet</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium flex items-center gap-1 transition-colors duration-300 ${
                    isActive(link.path) ? 'text-[#30C2EC]' : 'text-gray-600 hover:text-[#30C2EC]'
                  }`}
                >
                  {link.title}
                  <PlusOutlined className="text-xs opacity-50" />
                </Link>
              ))}
            </nav>

            {/* Auth Button */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <Link to="/auth/logout" className="flex items-center gap-2 text-[#30C2EC] font-medium hover:opacity-80">
                  <div className="w-8 h-8 rounded-full bg-[#30C2EC] flex items-center justify-center text-white">
                    <LogoutOutlined />
                  </div>
                  <span>Logout</span>
                </Link>
              ) : (
                <Link to="/auth/login" className="flex items-center gap-2 text-[#30C2EC] font-medium hover:opacity-80">
                  <div className="w-8 h-8 rounded-full bg-[#30C2EC] flex items-center justify-center text-white">
                    <UserOutlined />
                  </div>
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button 
              type="text" 
              icon={<MenuOutlined className="text-2xl text-[#30C2EC]" />} 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<span className="text-[#30C2EC] font-bold text-xl">EduNet</span>}
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-medium py-2 border-b border-gray-50 ${
                isActive(link.path) ? 'text-[#30C2EC]' : 'text-gray-600'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <div className="mt-4">
            <Link 
              to="/auth/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-[#30C2EC] font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-[#30C2EC] flex items-center justify-center text-white">
                <UserOutlined />
              </div>
              <span>Login</span>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
