import { ref, computed } from 'vue';
import * as validators from '@/utils/validation';

export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const values = ref({ ...initialValues });
  const errors = ref({});
  const touched = ref({});
  const isSubmitting = ref(false);

  const isDirty = computed(() => {
    return Object.keys(values.value).some(key => values.value[key] !== initialValues[key]);
  });

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  const validate = (fieldName = null) => {
    const fieldsToValidate = fieldName ? [fieldName] : Object.keys(validationRules);

    fieldsToValidate.forEach(field => {
      const rules = validationRules[field];
      const value = values.value[field];

      if (!rules) return;

      const fieldErrors = [];
      rules.forEach(rule => {
        let validator;
        let params;

        if (typeof rule === 'string') {
          validator = validators[rule];
        } else if (typeof rule === 'function') {
          validator = rule;
        } else if (Array.isArray(rule)) {
          [validator, params] = rule;
          validator = typeof validator === 'string' ? validators[validator] : validator;
        }

        if (!validator) return;

        const result = params ? validator(params)(value) : validator(value);
        if (result !== true) {
          fieldErrors.push(result);
        }
      });

      if (fieldErrors.length > 0) {
        errors.value[field] = fieldErrors[0]; // Only show first error
      } else {
        delete errors.value[field];
      }
    });

    return isValid.value;
  };

  const handleChange = (field, value) => {
    values.value[field] = value;
    if (touched.value[field]) {
      validate(field);
    }
  };

  const handleBlur = (field) => {
    touched.value[field] = true;
    validate(field);
  };

  const resetForm = () => {
    values.value = { ...initialValues };
    errors.value = {};
    touched.value = {};
    isSubmitting.value = false;
  };

  const handleSubmit = async (submitFn) => {
    isSubmitting.value = true;
    touched.value = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    const isFormValid = validate();
    if (!isFormValid) {
      isSubmitting.value = false;
      return;
    }

    try {
      await submitFn(values.value);
    } catch (error) {
      // Handle submission error
      if (error.response?.data?.errors) {
        errors.value = {
          ...errors.value,
          ...error.response.data.errors
        };
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  const getFieldProps = (field) => {
    return {
      value: values.value[field],
      error: errors.value[field],
      touched: touched.value[field],
      onChange: (e) => handleChange(field, e.target?.value ?? e),
      onBlur: () => handleBlur(field)
    };
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    validate,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldProps
  };
}; 