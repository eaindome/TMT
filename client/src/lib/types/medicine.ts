export type AuthenticityStatus = 'safe' | 'caution' | 'fake';

export interface ScanRecord {
    id: string;
    date: Date;
    location: string;
    status: AuthenticityStatus;
    user: string;
}

export interface ScanStats {
    totalScans: number;
    safeCounts: number;
    cautionCounts: number;
    fakeCounts: number;
}

export interface Medicine {
    id: string;
    name: string;
    brand: string;
    manufacturer: string;
    status: AuthenticityStatus;
    lastVerified: Date;
    images: string[];
    description: string;
    batchNumber: string;
    expiryDate: Date;
    scanStats: ScanStats;
    safetyInstructions: string[];
    recentScans: ScanRecord[];
}