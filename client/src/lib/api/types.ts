/**
 * Types for API client
 */

// Options for fetch requests
export interface FetchOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: Record<string, unknown> | FormData;
	headers?: Record<string, string>;
	token?: string;
	requiresAuth?: boolean;
	isFormData?: boolean;
}

// Common response types
export interface ApiResponse<T = unknown> {
	data?: T;
	success: boolean;
	message?: string;
	error?: string;
}

// Error response
export interface ApiError {
	error: string;
	status?: number;
	message?: string;
}

// Paginated response structure
export interface PaginatedResponse<T> {
	items: T[];
	totalItems: number;
	page: number;
	totalPages: number;
	hasMore: boolean;
}
