import { useState, useEffect } from 'react';

/**
 * 
 * 
 * @param {Function} callback 
 * @param {Function} validate 
 * @return {Object} 
 */
const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(values => ({ ...values, [name]: value }));
  };

 
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  
  useEffect(() => {
  
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();  
    }
    setIsSubmitting(false); 
  }, [errors, isSubmitting, callback]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;