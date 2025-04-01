import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Clock } from 'lucide-react';
import { healthTipCategories, type HealthTip } from '../data/healthTips';

export default function HealthTips() {
  const navigate = useNavigate();

  const TipCard = ({ tip }: { tip: HealthTip }) => (
    <div 
      className="relative flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all border border-gray-100"
    >
      <div className="aspect-[4/3]">
        <img
          src={tip.image}
          alt={tip.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      {/* Duration badge */}
      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-mybakup-blue text-xs font-medium rounded-full flex items-center gap-1 shadow-sm">
        <Clock className="w-3 h-3" />
        <span>{tip.duration}</span>
      </div>

      {/* Play button */}
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
        <Play className="w-6 h-6 text-mybakup-coral fill-current" />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block px-2 py-1 bg-mybakup-coral/90 text-white text-xs font-medium rounded-full mb-2 backdrop-blur-sm">
          {tip.tag}
        </span>
        <h3 className="text-white font-medium mb-1 line-clamp-2">{tip.title}</h3>
        <p className="text-white/80 text-sm line-clamp-2 mb-3">{tip.description}</p>
        
        <div className="flex items-center gap-2">
          <img
            src={tip.doctorImage}
            alt={tip.doctorName}
            className="w-6 h-6 rounded-full object-cover ring-2 ring-white/20"
          />
          <div>
            <p className="text-white text-xs font-medium">{tip.doctorName}</p>
            <p className="text-white/70 text-xs">{tip.doctorSpecialty}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#EDF5FF]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#424e6f]" />
          </button>
          <h1 className="text-xl font-semibold text-mybakup-blue">
            Conseils santé
          </h1>
        </div>
      </header>

      <main className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          {/* Hero Section - Made smaller and more modern */}
          <section className="relative h-[40vh] rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=2000&h=800"
              alt="Health Tips"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mybakup-blue/90 via-mybakup-blue/50 to-transparent backdrop-blur-[2px]" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 bg-mybakup-coral/90 text-white text-sm font-medium rounded-full mb-4 backdrop-blur-sm">
                  Conseils d'experts
                </span>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Conseils santé pour voyageurs
                </h2>
                <p className="text-lg text-white/90">
                  Des experts de la santé partagent leurs conseils pour voyager en toute sérénité.
                </p>
              </div>
            </div>
          </section>

          {/* Categories */}
          {healthTipCategories.map((category) => (
            <section key={category.id} className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-mybakup-blue mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                {category.tips.map((tip) => (
                  <TipCard key={tip.id} tip={tip} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}