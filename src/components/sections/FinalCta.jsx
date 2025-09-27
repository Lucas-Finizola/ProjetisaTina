import React from 'react';
import { motion } from 'framer-motion';
import { getAllContent } from '../../utils/contentCache';

const FinalCta = ({ scrollToHeroForm }) => {
  const content = getAllContent('home-final-cta');

  if (!content) {
    return null; // ou um componente de carregamento
  }

  return (
    <section id="simulacao" className="py-20 bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h2>
          <p className="text-xl mb-8">
            {content.subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToHeroForm} // A funcionalidade permanece a mesma
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-lg font-bold text-xl transition-colors shadow-lg"
          >
            {content.buttonText}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCta;
