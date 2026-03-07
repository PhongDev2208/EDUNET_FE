// Chart Card Component
import React from 'react';
import { Card, Spin } from 'antd';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  height?: number | string;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  extra,
  children,
  loading = false,
  height = 300,
  className = '',
}) => {
  return (
    <Card
      className={`chart-card ${className}`}
      title={
        <div>
          <span className="font-semibold">{title}</span>
          {subtitle && (
            <span className="text-gray-400 text-sm font-normal ml-2">
              {subtitle}
            </span>
          )}
        </div>
      }
      extra={extra}
    >
      <Spin spinning={loading}>
        <div style={{ height, minHeight: height }}>
          {children}
        </div>
      </Spin>
    </Card>
  );
};

export default ChartCard;
