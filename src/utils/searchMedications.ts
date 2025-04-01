import { Medication, SearchResult } from '../types/medications';

export function searchMedications(query: string, medications: Medication[]): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];

  return medications
    .map(medication => {
      // Check each field for matches
      if (medication.genericFr.toLowerCase().includes(normalizedQuery)) {
        return { medication, matchType: 'genericFr' as const };
      }
      if (medication.genericEn.toLowerCase().includes(normalizedQuery)) {
        return { medication, matchType: 'genericEn' as const };
      }
      if (medication.brandNameEn.toLowerCase().includes(normalizedQuery)) {
        return { medication, matchType: 'brandNameEn' as const };
      }
      return null;
    })
    .filter((result): result is SearchResult => result !== null);
}