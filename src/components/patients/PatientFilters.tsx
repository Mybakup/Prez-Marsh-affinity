import React from 'react';

export default function PatientFilters() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Période
        </label>
        <select className="w-full rounded-lg border-gray-200 focus:ring-mybakup-coral">
          <option value="all">Toutes les périodes</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
          <option value="year">Cette année</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type de consultation
        </label>
        <select className="w-full rounded-lg border-gray-200 focus:ring-mybakup-coral">
          <option value="all">Tous les types</option>
          <option value="consultation">Consultation</option>
          <option value="emergency">Urgence</option>
          <option value="followup">Suivi</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-mybakup-coral focus:ring-mybakup-coral" />
            <span className="ml-2 text-sm text-gray-600">Avec ordonnance</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-mybakup-coral focus:ring-mybakup-coral" />
            <span className="ml-2 text-sm text-gray-600">Avec suivi</span>
          </label>
        </div>
      </div>
    </div>
  );
}