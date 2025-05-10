export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
}
  
export function formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
}
  
export interface VerdictMapping {
    green: string;
    yellow: string;
    red: string;
    [key: string]: string;
}

export function formatVerdict(verdict: keyof VerdictMapping): string {
    switch (verdict) {
      case 'green':
        return 'Verified Safe';
      case 'yellow':
        return 'Needs Caution';
      case 'red':
        return 'Potentially Fake';
      default:
        return 'Unknown';
    }
}