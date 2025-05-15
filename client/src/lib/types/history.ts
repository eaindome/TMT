// Verification record type
export interface Verification {
  id: string;
  drugName: string;
  status: 'safe' | 'caution' | 'fake';
  timestamp: string;
  batchNumber: string;
  manufacturer: string;
}

// User role types
export type UserRole = 'consumer' | 'pharmacist' | 'healthcare' | 'regulator' | 'premium';

// Filter options type
export interface FilterOptions {
  searchQuery: string;
  dateFilter: string;
  resultFilter: string;
}

// Pagination type
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}