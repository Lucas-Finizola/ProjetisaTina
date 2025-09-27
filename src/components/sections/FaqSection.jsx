import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCollection } from '../../utils/content'; // CORRIGIDO

const FaqSection = () => {
  // 1. Usa o estado para armazenar os FAQs. Começa como um array vazio.
  const [faqs, setFaqs] = useState([]);

  // 2. Usa useEffect para buscar os dados quando o componente for montado.
  useEffect(() => {
    // Função assíncrona para buscar os dados da coleção 'faqs'.
    const fetchFaqs = async () => {
      const data = await getCollection('faqs');
      setFaqs(data || []); // Garante que o estado seja sempre um array.
    };

    fetchFaqs();
  }, []); // O array vazio [] garante que isso rode apenas uma vez.

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dúvidas Frequentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Respostas para as perguntas mais comuns sobre energia solar.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* A lógica de renderização continua a mesma */}
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <motion.div key={faq.id || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.pergunta}</h3>
                <p className="text-gray-700">{faq.resposta}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">Carregando perguntas...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;