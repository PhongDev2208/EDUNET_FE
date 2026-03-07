import { useState, useMemo } from 'react';
import { message } from 'antd';
import { MOCK_MATERIALS } from '../constants/myCourseData';
import type { MaterialItem } from '../types/myCourse';

export const useMaterial = () => {
  const [userRole] = useState<'student' | 'teacher'>('teacher');
  const [materials, setMaterials] = useState<MaterialItem[]>(MOCK_MATERIALS);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesType = filterType === 'all' || material.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [materials, searchText, filterType]);

  const stats = useMemo(() => ({
    total: materials.length,
    pdf: materials.filter(m => m.type === 'pdf').length,
    video: materials.filter(m => m.type === 'video').length,
    document: materials.filter(m => m.type === 'document').length,
  }), [materials]);

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'pdf':
        return { color: 'red', text: 'PDF' };
      case 'video':
        return { color: 'blue', text: 'Video' };
      case 'document':
        return { color: 'green', text: 'Document' };
      case 'link':
        return { color: 'purple', text: 'Link' };
      case 'image':
        return { color: 'orange', text: 'Image' };
      default:
        return { color: 'default', text: 'File' };
    }
  };

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (materialId: string) => {
    setMaterials(materials.filter(m => m.id !== materialId));
    message.success('Material deleted successfully');
  };

  const handleSubmit = (values: any) => {
    const newMaterial: MaterialItem = {
      id: Date.now().toString(),
      title: values.title,
      type: values.type,
      size: '1.2 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      downloadUrl: values.downloadUrl || '/materials/new-file',
      description: values.description,
    };
    setMaterials([newMaterial, ...materials]);
    message.success('Material uploaded successfully');
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    userRole,
    materials,
    filteredMaterials,
    searchText,
    setSearchText,
    filterType,
    setFilterType,
    isModalOpen,
    stats,
    getTypeConfig,
    handleUpload,
    handleDelete,
    handleSubmit,
    closeModal,
  };
};
