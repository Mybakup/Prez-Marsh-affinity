import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Trouvez des praticiens qui parlent votre langue",
    description: "Prenez rendez-vous avec des professionnels de santé qui comprennent vos besoins, où que vous soyez dans le monde.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=2000",
    color: "#FFE8E8"
  },
  {
    id: 2,
    title: "Pharmacies et hôpitaux à proximité",
    description: "Localisez facilement les établissements de santé autour de vous et accédez aux informations essentielles.",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=2000",
    color: "#EDF5FF"
  },
  {
    id: 3,
    title: "Téléconsultation en 15 minutes",
    description: "Accédez à une consultation médicale rapide et aux informations sanitaires de votre lieu de séjour.",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80&w=2000",
    color: "#E8F4FF"
  }
];

export default function OnboardingTutorial({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  };

  const backgroundVariants = {
    enter: {
      opacity: 0
    },
    center: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const paginate = (newDirection: number) => {
    if (currentSlide + newDirection < 0 || currentSlide + newDirection >= slides.length) return;
    setDirection(newDirection);
    setCurrentSlide(currentSlide + newDirection);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Header buttons */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="text-sm text-white hover:underline"
          >
            Passer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className="relative"
              style={{ backgroundColor: slides[currentSlide].color }}
            >
              <motion.div
                variants={backgroundVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-64 sm:h-80">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                </div>

                {/* Content */}
                <motion.div 
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative bg-white rounded-t-[2rem] -mt-8 p-8 space-y-6"
                >
                  <h2 className="text-2xl font-bold text-[#47559E]">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-gray-600">
                    {slides[currentSlide].description}
                  </p>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-2">
                      {slides.map((_, index) => (
                        <motion.div
                          key={index}
                          initial={false}
                          animate={{
                            width: index === currentSlide ? 24 : 8,
                            backgroundColor: index === currentSlide ? "#47559E" : "#D1D5DB"
                          }}
                          className="h-2 rounded-full transition-all"
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {currentSlide > 0 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => paginate(-1)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </motion.button>
                      )}
                      {currentSlide < slides.length - 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => paginate(1)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-600" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onComplete}
                          className="px-6 py-2 bg-[#47559E] text-white rounded-full font-medium hover:bg-opacity-90 transition-colors"
                        >
                          Commencer
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}