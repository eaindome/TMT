export function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : 'Invalid email address';
  }
  
  export function validatePassword(password: string) {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  }
  
export function validateBatchNumber(batchNumber: string): string | null {
    if (!batchNumber) {
        return 'Batch number is required';
    }
    if (batchNumber.length < 3) {
        return 'Batch number must be at least 3 characters';
    }
    return null;
}
  
interface FileInput {
    type: string;
    size: number;
}

export function validateFile(file: FileInput | null): string | null {
    if (!file) {
        return 'Please select a file';
    }
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        return 'Only JPEG or PNG files are allowed';
    }
    if (file.size > 5 * 1024 * 1024) {
        return 'File size must be less than 5MB';
    }
    return null;
}