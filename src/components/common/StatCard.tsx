import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  iconBgColor = '#e5698e20',
  iconColor = '#e5698e',
  className = '',
  trend,
}) => {
  return (
    <Card className={`rounded-2xl border-0 shadow-md hover:shadow-lg transition-all ${className}`}>
      <div className="flex items-center gap-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
        <div>
          <Text className="text-gray-500 text-sm block">{title}</Text>
          <div className="flex items-center gap-2">
            <Text className="font-bold text-2xl text-[#012643]">{value}</Text>
            {trend && (
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
