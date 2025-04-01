import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Pill } from 'lucide-react';
import { medications } from '../data/medications';
import { searchMedications } from '../utils/searchMedications';
import MedicationCard from '../components/MedicationCard';
import type { SearchResult } from '../types/medications';

const examples = [
  "Paracétamol",
  "Tylenol",
  "Ibuprofen",
  "Ventolin"
];

export default function MedicationTranslator() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentExample, setCurrentExample] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const searchResults = searchMedications(query, medications);
    setResults(searchResults);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-mybakup-blue" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-mybakup-blue">
              Traducteur de médicaments
            </h1>
          </div>
          <div className="p-2 rounded-xl bg-[#FFE8E8]">
            <Pill className="w-6 h-6 text-mybakup-coral" />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Try searching for "${examples[currentExample]}"`}
              className="w-full h-12 pl-12 pr-12 bg-white border border-gray-200 rounded-xl text-mybakup-blue focus:outline-none focus:ring-2 focus:ring-mybakup-coral"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 text-center">
            Search by French name, English name, or brand name
          </p>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-mybakup-blue">
              {results.length} result{results.length > 1 ? 's' : ''} found
            </h2>
            <div className="grid gap-4">
              {results.map((result, index) => (
                <MedicationCard
                  key={`${result.medication.genericFr}-${index}`}
                  medication={result.medication}
                  matchType={result.matchType}
                />
              ))}
            </div>
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No medications found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#EDF5FF] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-mybakup-blue mb-4">
                Comment ça marche ?
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  1. Entrez le nom de votre médicament en français ou en anglais
                </p>
                <p className="text-gray-600">
                  2. Trouvez instantanément les équivalents dans les deux langues
                </p>
                <p className="text-gray-600">
                  3. Découvrez les noms de marque courants et les indications principales
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-mybakup-blue mb-4">
                Conseils de recherche
              </h2>
              <div className="space-y-3">
                <p className="text-gray-600">
                  • Vous pouvez rechercher par nom générique français ou anglais
                </p>
                <p className="text-gray-600">
                  • Les noms de marque américains/britanniques sont également reconnus
                </p>
                <p className="text-gray-600">
                  • La recherche n'est pas sensible aux accents ou à la casse
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}