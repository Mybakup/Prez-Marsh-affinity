export interface Medication {
  genericFr: string;
  genericEn: string;
  brandNameEn: string;
  indication: string;
}

export interface SearchResult {
  medication: Medication;
  matchType: 'genericFr' | 'genericEn' | 'brandNameEn';
}