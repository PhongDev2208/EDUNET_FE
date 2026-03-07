import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAOS = (options?: AOS.AosOptions) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      ...options,
    });
  }, [options]);
};
