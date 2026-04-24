import React, { useState } from 'react';
import { Button, Collapse, Checkbox, Slider, Rate, Input, Spin } from 'antd';
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../services/courseApi';
import Badge from '../common/Tag';

const { Text } = Typography;

type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface FilterSidebarProps {
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
  selectedLevel: LevelFilter;
  onLevelChange: (level: LevelFilter) => void;
  minimumRating: number;
  onMinimumRatingChange: (rating: number) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceRangeChange: (value: [number, number]) => void;
  onReset: () => void;
}

const LEVEL_OPTIONS: Array<{ label: string; value: LevelFilter }> = [
  { label: 'Tất cả trình độ', value: 'all' },
  { label: 'Người mới', value: 'beginner' },
  { label: 'Trung cấp', value: 'intermediate' },
  { label: 'Nâng cao', value: 'advanced' },
];

const formatPrice = (value: number): string => {
  if (value <= 0) return '0 đ';
  if (value < 1000) return `$${value.toFixed(2).replace(/\.00$/, '')}`;
  return `${new Intl.NumberFormat('vi-VN').format(value)} đ`;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategoryId,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  minimumRating,
  onMinimumRatingChange,
  priceRange,
  maxPrice,
  onPriceRangeChange,
  onReset,
}) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery({ size: 'unlimited' });
  const categories = categoriesData?.data?.rows || [];
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentCategoryId ? [currentCategoryId] : []);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleCategoryChange = (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId) 
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelected);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories[0]);
    }
    navigate(`/courses?${params.toString()}`);
  };

  const handleReset = () => {
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setSelectedDays([]);
    setSelectedRating(0);
    navigate('/courses');
  };

  const items = [
    {
      key: '1',
      label: <span className="font-semibold text-base text-[#012643]">Tìm kiếm</span>,
      children: (
        <Input
          placeholder="Tìm trong bộ lọc..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="!rounded-lg"
          allowClear
        />
      ),
    },
    {
      key: '2',
      label: <span className="font-semibold text-base text-[#012643]">Danh mục</span>,
      children: isCategoriesLoading ? (
        <div className="flex justify-center py-4">
          <Spin size="small" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex justify-between items-center cursor-pointer p-2 rounded-lg transition-all ${
                selectedCategories.includes(cat.id) 
                  ? 'bg-[#e5698e]/10 text-[#e5698e]' 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span className="font-medium">{cat.name}</span>
              <Badge className={`!rounded-full !border-none ${
                selectedCategories.includes(cat.id) ? '!bg-[#e5698e] !text-white' : '!bg-gray-100'
              }`}>
                {cat.courses?.length || 0}
              </Badge>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="font-semibold text-base text-[#012643]">Khoảng giá</span>,
      children: (
        <div className="px-2">
          <Slider
            range
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={100}
            tooltip={{ formatter: (value) => `$${value}` }}
            trackStyle={[{ backgroundColor: '#e5698e' }]}
            handleStyle={[{ borderColor: '#e5698e' }, { borderColor: '#e5698e' }]}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: <span className="font-semibold text-base text-[#012643]">Đánh giá</span>,
      children: (
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                selectedRating === rating 
                  ? 'bg-[#e5698e]/10' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Rate disabled defaultValue={rating} className="text-sm" />
              <span className="text-gray-500 text-sm">trở lên</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '5',
      label: <span className="font-semibold text-base text-[#012643]">Lịch học</span>,
      children: (
        <div className="flex flex-col gap-2">
          <Checkbox.Group 
            value={selectedDays}
            onChange={(values) => setSelectedDays(values as string[])}
            className="flex flex-col gap-2"
          >
            {FILTER_DAYS.map((day) => (
              <Checkbox 
                key={day} 
                value={day}
                className="!ml-0 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-600">{day}</span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      ),
    },
    {
      key: '6',
      label: <span className="font-semibold text-base text-[#012643]">Trình độ</span>,
      children: (
        <div className="flex flex-col gap-2">
          {['Người mới', 'Trung cấp', 'Nâng cao', 'Tất cả trình độ'].map((level) => (
            <Checkbox key={level} className="!ml-0 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-600">{level}</span>
            </Checkbox>
          ))}
        </div>
      ),
    },
  ];

  return (
    <aside className="course-filter-panel h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_26px_-20px_rgba(15,23,42,0.45)]">
      <div className="mb-1 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.04em]">
          Bộ lọc khóa học
        </h3>
        <Button
          type="text"
          size="small"
          icon={<ReloadOutlined />}
          onClick={onReset}
          className="course-filter-reset !h-7 !px-1.5 !text-[11px] font-medium"
        >
          Đặt lại
        </Button>
      </div>

      {(selectedCategoryId || selectedLevel !== 'all' || minimumRating > 0) && (
        <div className="mb-3.5 flex flex-wrap gap-1.5">
          {selectedCategoryId && (
            <Tag
              closable
              onClose={() => onCategoryChange(undefined)}
              className="course-filter-active-tag !rounded-full !border-none !px-2 !py-0.5 !text-[11px]"
              style={{
                backgroundColor: 'var(--textState500Secondary)',
                color: 'var(--textStateWhite)',
              }}
            >
              {categories.find((category) => category.id === selectedCategoryId)?.name || 'Danh mục đã chọn'}
            </Tag>
          )}
       
          {minimumRating > 0 && (
            <Tag className="course-filter-active-tag !rounded-full !border-none !px-2 !py-0.5 !text-[11px]" style={{ backgroundColor: 'var(--textStateLightOrange)' }}>
              <StarFilled /> {minimumRating}+ sao
            </Tag>
          )}
        </div>
      )}

      <div className="space-y-4">
        <section className="course-filter-section">
          <Text className="course-filter-label mb-2 block text-[11px] font-semibold uppercase">
            Danh mục
          </Text>
          {isCategoriesLoading ? (
            <div className="flex justify-center py-3">
              <Spin size="small" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onCategoryChange(isActive ? undefined : category.id)}
                    className={`course-filter-chip ${isActive ? 'is-active' : ''}`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="course-filter-section">
          <Text className="course-filter-label mb-2 block text-[11px] font-semibold uppercase">
            Trình độ
          </Text>
          <div className="grid gap-2">
            {LEVEL_OPTIONS.map((levelOption) => {
              const isActive = selectedLevel === levelOption.value;

              return (
                <button
                  key={levelOption.value}
                  type="button"
                  onClick={() => onLevelChange(levelOption.value)}
                  className={`course-filter-level ${isActive ? 'is-active' : ''}`}
                >
                  {levelOption.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="course-filter-section">
          <Text className="course-filter-label mb-2 block text-[11px] font-semibold uppercase">
            Khoảng giá
          </Text>
          <Slider
            range
            value={priceRange}
            onChange={(value) => onPriceRangeChange(value as [number, number])}
            min={0}
            max={maxPrice}
            className="course-filter-slider"
            tooltip={{ formatter: (value) => formatPrice(value || 0) }}
          />
          <div className="mt-1.5 flex justify-between text-[12px] text-slate-500">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </section>

        <section>
          <Text className="course-filter-label mb-2 block text-[11px] font-semibold uppercase">
            Đánh giá tối thiểu
          </Text>
          <Rate
            className="text-[13px]"
            allowClear
            value={minimumRating}
            onChange={(value) => onMinimumRatingChange(value || 0)}
            style={{ color: 'var(--textStateLightOrange)' }}
          />
        </section>
      </div>
    </aside>
  );
};

export default FilterSidebar;
