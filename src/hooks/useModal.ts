import { useState, useCallback } from 'react';

interface UseModalReturn<T = any> {
  isOpen: boolean;
  data: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export function useModal<T = any>(initialData: T | null = null): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(initialData);

  const openModal = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;
