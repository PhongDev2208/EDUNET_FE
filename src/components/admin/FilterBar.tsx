// Filter Bar Component
import React from 'react';
import { Input, Select, DatePicker, Button, Space, Card } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface FilterOption {
  label: string;
  value: string;
}

interface FilterField {
  type: 'search' | 'select' | 'dateRange' | 'date';
  key: string;
  placeholder?: string;
  options?: FilterOption[];
  width?: number | string;
  allowClear?: boolean;
}

interface FilterBarProps {
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  onReset?: () => void;
  onRefresh?: () => void;
  fields: FilterField[];
  extra?: React.ReactNode;
  loading?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  onRefresh,
  fields,
  extra,
  loading = false,
}) => {
  const renderField = (field: FilterField) => {
    const { type, key, placeholder, options, width = 180, allowClear = true } = field;

    switch (type) {
      case 'search':
        return (
          <Input
            key={key}
            placeholder={placeholder || 'Tìm kiếm...'}
            prefix={<SearchOutlined className="text-gray-400" />}
            value={filters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            allowClear={allowClear}
            style={{ width }}
          />
        );

      case 'select':
        return (
          <Select
            key={key}
            placeholder={placeholder || 'Chọn...'}
            value={filters[key]}
            onChange={(value) => onFilterChange(key, value)}
            allowClear={allowClear}
            style={{ width }}
            options={options}
          />
        );

      case 'dateRange':
        return (
          <RangePicker
            key={key}
            value={filters[key]}
            onChange={(dates) => onFilterChange(key, dates)}
            style={{ width: width || 260 }}
            placeholder={['Từ ngày', 'Đến ngày']}
          />
        );

      case 'date':
        return (
          <DatePicker
            key={key}
            placeholder={placeholder || 'Chọn ngày'}
            value={filters[key]}
            onChange={(date) => onFilterChange(key, date)}
            style={{ width }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="filter-bar mb-4" bodyStyle={{ padding: '16px' }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Space wrap size="middle">
          <FilterOutlined className="text-gray-400" />
          {fields.map(renderField)}
        </Space>
        
        <Space>
          {extra}
          {onReset && (
            <Button 
              icon={<ClearOutlined />} 
              onClick={onReset}
            >
              Xóa bộ lọc
            </Button>
          )}
          {onRefresh && (
            <Button 
              icon={<ReloadOutlined />} 
              onClick={onRefresh}
              loading={loading}
            >
              Làm mới
            </Button>
          )}
        </Space>
      </div>
    </Card>
  );
};

export default FilterBar;
