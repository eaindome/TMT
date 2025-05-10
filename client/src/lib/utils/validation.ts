import { z } from 'zod';

// Common validation schema for user login
export const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password is too long')
});

// Common validation schema for user signup
export const signupSchema = loginSchema
	.extend({
		confirmPassword: z.string().min(1, 'Please confirm your password'),
		terms: z.boolean().refine((val) => val === true, {
			message: 'You must accept the terms and conditions'
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

// User profile schema
export const profileSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Please enter a valid email address'),
	bio: z.string().max(500, 'Bio must be less than 500 characters').optional()
});

// Scan validation schema
export const scanSchema = z.object({
	batchNumber: z
		.string()
		.min(3, 'Batch number must be at least 3 characters')
		.max(50, 'Batch number is too long'),
	photo: z
		.instanceof(File, { message: 'Please select an image file' })
		.refine((file) => file.size <= 5 * 1024 * 1024, {
			message: 'File size must be less than 5MB'
		})
		.refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
			message: 'Only JPEG or PNG files are allowed'
		})
});

// Review validation schema
export const reviewSchema = z.object({
	batchNumber: z.string().min(1, 'Batch number is required'),
	rating: z.number().min(1, 'Rating is required').max(5),
	comment: z.string().max(1000, 'Comment must be less than 1000 characters').optional()
});

// Feedback validation schema
export const feedbackSchema = z.object({
	scanId: z.string().min(1, 'Scan ID is required'),
	rating: z.number().min(0).max(1)
});

/**
 * Validates data against a schema and returns any validation errors
 * @param schema Zod schema to validate against
 * @param data Data to validate
 * @returns Object with success flag and errors if any
 */
export function validateForm<T>(
	schema: z.ZodType<T>,
	data: unknown
): { success: boolean; data?: T; errors?: Record<string, string> } {
	try {
		const validData = schema.parse(data);
		return { success: true, data: validData };
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors: Record<string, string> = {};
			error.errors.forEach((err) => {
				if (err.path.length > 0) {
					const path = err.path.join('.');
					errors[path] = err.message;
				}
			});
			return { success: false, errors };
		}
		return {
			success: false,
			errors: { _form: 'An unexpected error occurred' }
		};
	}
}
