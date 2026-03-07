import React, { useState } from 'react';
import { Button, Collapse, Checkbox, Slider, Rate, Input, Tag, Spin } from 'antd';
import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../services/courseApi';

const FILTER_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const FilterSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategoryId = searchParams.get('category');
  
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
      label: <span className="font-semibold text-base text-[#012643]">Search</span>,
      children: (
        <Input
          placeholder="Search in filters..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="!rounded-lg"
          allowClear
        />
      ),
    },
    {
      key: '2',
      label: <span className="font-semibold text-base text-[#012643]">Categories</span>,
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
              <Tag className={`!rounded-full !border-none ${
                selectedCategories.includes(cat.id) ? '!bg-[#e5698e] !text-white' : '!bg-gray-100'
              }`}>
                {cat.courses?.length || 0}
              </Tag>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="font-semibold text-base text-[#012643]">Price Range</span>,
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
      label: <span className="font-semibold text-base text-[#012643]">Rating</span>,
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
              <span className="text-gray-500 text-sm">& up</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '5',
      label: <span className="font-semibold text-base text-[#012643]">Schedule</span>,
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
      label: <span className="font-semibold text-base text-[#012643]">Level</span>,
      children: (
        <div className="flex flex-col gap-2">
          {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
            <Checkbox key={level} className="!ml-0 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-600">{level}</span>
            </Checkbox>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#012643]">Filters</h3>
        <Button 
          type="text" 
          onClick={handleReset}
          className="text-gray-400 hover:!text-[#e5698e] font-medium"
        >
          Reset All
        </Button>
      </div>
      
      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedRating > 0) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedCategories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return (
              <Tag 
                key={catId}
                closable 
                onClose={() => handleCategoryChange(catId)}
                className="!rounded-full !bg-[#012643] !text-white !border-none !px-3 !py-1"
              >
                {category?.name || catId}
              </Tag>
            );
          })}
          {selectedRating > 0 && (
            <Tag 
              closable 
              onClose={() => setSelectedRating(0)}
              className="!rounded-full !bg-[#e5698e] !text-white !border-none !px-3 !py-1 flex items-center gap-1"
            >
              <StarFilled /> {selectedRating}+
            </Tag>
          )}
        </div>
      )}
      
      <Collapse 
        defaultActiveKey={['1', '2', '3']} 
        ghost 
        expandIconPosition="end"
        items={items}
        className="filter-collapse"
      />

      <Button 
        type="primary" 
        block 
        size="large"
        onClick={handleApplyFilters}
        className="!mt-6 !bg-[#012643] !border-[#012643] hover:!bg-[#023e6d] !rounded-xl !h-12 !font-medium"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
