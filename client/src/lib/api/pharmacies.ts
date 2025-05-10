import { apiClient } from './client';

export interface Pharmacy {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	trustScore?: number;
	verified?: boolean;
}

/**
 * Find pharmacies near a geographic location
 * @param lat Latitude
 * @param lng Longitude
 * @returns Promise with array of pharmacies
 */
export async function findPharmacies(lat: number, lng: number): Promise<Pharmacy[]> {
	try {
		return await apiClient.get<Pharmacy[]>(`api/pharmacies?lat=${lat}&lng=${lng}`);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to fetch pharmacies');
		}
		throw new Error('Failed to fetch pharmacies');
	}
}
