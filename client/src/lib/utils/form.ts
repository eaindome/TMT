import { writable } from 'svelte/store';

// Form validation types
export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
}

// Validation functions
export function validateRequired(value: string): ValidationResult {
  const valid = value.trim().length > 0;
  return {
    valid,
    message: valid ? '' : 'This field is required'
  };
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailRegex.test(email);
  return {
    valid,
    message: valid ? '' : 'Please enter a valid email address'
  };
}

export function validateMinLength(value: string, minLength: number): ValidationResult {
  const valid = value.length >= minLength;
  return {
    valid,
    message: valid ? '' : `Must be at least ${minLength} characters`
  };
}

export function validateMaxLength(value: string, maxLength: number): ValidationResult {
  const valid = value.length <= maxLength;
  return {
    valid,
    message: valid ? '' : `Must be less than ${maxLength} characters`
  };
}

export function validatePattern(value: string, pattern: RegExp): ValidationResult {
  const valid = pattern.test(value);
  return {
    valid,
    message: valid ? '' : 'Invalid format'
  };
}

// Form validation function
export function validateField(value: string, rules: ValidationRules): ValidationResult {
  if (rules.required && !validateRequired(value).valid) {
    return validateRequired(value);
  }

  if (rules.email && value.trim() !== '' && !validateEmail(value).valid) {
    return validateEmail(value);
  }

  if (rules.minLength !== undefined && value.trim() !== '' && !validateMinLength(value, rules.minLength).valid) {
    return validateMinLength(value, rules.minLength);
  }

  if (rules.maxLength !== undefined && !validateMaxLength(value, rules.maxLength).valid) {
    return validateMaxLength(value, rules.maxLength);
  }

  if (rules.pattern && value.trim() !== '' && !validatePattern(value, rules.pattern).valid) {
    return validatePattern(value, rules.pattern);
  }

  return { valid: true, message: '' };
}

// Create a form store for managing form state
export function createForm<T>(initialValues: T) {
  const { subscribe, set, update } = writable({
    values: initialValues,
    touched: {} as Record<keyof T, boolean>,
    errors: {} as Record<keyof T, string>,
    isSubmitting: false,
    isValid: false
  });

  function validateForm(values: T, validationSchema: Record<keyof T, ValidationRules>) {
    const errors = {} as Record<keyof T, string>;
    let isValid = true;

    for (const field in validationSchema) {
      const result = validateField(values[field] as unknown as string, validationSchema[field]);
      if (!result.valid) {
        errors[field] = result.message;
        isValid = false;
      }
    }

    return { errors, isValid };
  }

  return {
    subscribe,
    setValue: (field: keyof T, value: T[keyof T]) => {
      update(state => ({
        ...state,
        values: { ...state.values, [field]: value },
        touched: { ...state.touched, [field]: true }
      }));
    },
    setTouched: (field: keyof T, isTouched = true) => {
      update(state => ({
        ...state,
        touched: { ...state.touched, [field]: isTouched }
      }));
    },
    validate: (validationSchema: Record<keyof T, ValidationRules>) => {
      update(state => {
        const { errors, isValid } = validateForm(state.values, validationSchema);
        return { ...state, errors, isValid };
      });
    },
    reset: () => {
      set({
        values: initialValues,
        touched: {} as Record<keyof T, boolean>,
        errors: {} as Record<keyof T, string>,
        isSubmitting: false,
        isValid: false
      });
    },
    setSubmitting: (isSubmitting: boolean) => {
      update(state => ({ ...state, isSubmitting }));
    }
  };
}