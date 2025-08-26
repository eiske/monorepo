// useForm.js
import { useState, useCallback } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, []);

  return { formData, handleChange };
};

export default useForm;
