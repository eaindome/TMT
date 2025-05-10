const API_URL = import.meta.env.VITE_API_URL;

interface UploadScanResponse {
	success: boolean;
	message: string;
	id: string;
	url: string;
	verdict?: string;
	data?: Record<string, unknown>;
}

interface UploadScanError {
	error: string;
}

export async function uploadScan(
	photo: File,
	batchNumber: string,
	token: string
): Promise<UploadScanResponse> {
	const formData = new FormData();
	formData.append('photo', photo);
	formData.append('batchNumber', batchNumber);

	const response = await fetch(`${API_URL}/api/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: formData
	});

	if (!response.ok) {
		const error: UploadScanError = await response.json();
		throw new Error(error.error || 'Failed to upload scan');
	}

	return (await response.json()) as UploadScanResponse;
}
