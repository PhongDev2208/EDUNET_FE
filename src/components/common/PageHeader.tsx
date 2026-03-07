import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeColor = '#e5698e',
  actions,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 ${className}`}>
      <div>
        {badge && (
          <div 
            className="inline-block px-4 py-2 rounded-full mb-3"
            style={{ backgroundColor: `${badgeColor}15` }}
          >
            <span style={{ color: badgeColor }} className="font-semibold text-sm">{badge}</span>
          </div>
        )}
        <Title level={2} className="!text-[#012643] !mb-2 !text-2xl md:!text-3xl">{title}</Title>
        {subtitle && (
          <Paragraph className="text-gray-500 !mb-0">{subtitle}</Paragraph>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
