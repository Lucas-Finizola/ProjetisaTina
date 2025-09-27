import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { List, Grid, Loader, AlertTriangle } from 'lucide-react';
import { getAllProjetos } from '../../utils/projetosData';
import { getImageUrl } from '../../utils/mediaUtils';
import { extractFirstParagraphText } from '../../utils/richTextRenderer';

const Projetos = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjetos = async () => {
      setLoading(true);
      try {
        const todosProjetos = await getAllProjetos();
        const validProjetos = (todosProjetos || []).filter(p => !!p.slug && !!p.titulo);
        setProjetos(validProjetos);
      } catch (e) {
        console.error('Erro ao buscar projetos:', e);
        setError('Ocorreu um erro ao carregar os projetos.');
      } finally {
        setLoading(false);
      }
    };
    loadProjetos();
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    <div className="bg-gray-50">
      {/* Hero Section Adicionada */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nossos Projetos
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conheça alguns dos projetos de sucesso que entregamos, combinando tecnologia de ponta e engenharia de precisão.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 min-h-[70vh]">
        <div className="flex justify-end items-center mb-12">
          {/* Botões de visualização */}
          <div className="flex space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><Grid /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><List /></button>
          </div>
        </div>

        {loading && <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-green-600 w-12 h-12" /></div>}
        {error && <div className="text-center bg-red-50 p-8 rounded-lg"><AlertTriangle className="mx-auto text-red-500 w-12 h-12"/><p className="mt-4 text-xl text-red-700">{error}</p></div>}

        {!loading && !error && (
          <motion.div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"} variants={containerVariants} initial="hidden" animate="visible">
            {projetos.map((projeto) => {
              const imageUrl = getImageUrl(projeto.imagem?.url);
              const plainDescription = extractFirstParagraphText(projeto.descricao);

              return (
                <motion.div key={projeto.id} variants={itemVariants}>
                  <Link to={`/projetos/${projeto.slug}`} className="block h-full">
                    <motion.div className={`bg-white rounded-xl shadow-lg overflow-hidden flex group ${viewMode === 'grid' ? 'flex-col h-full' : 'flex-row items-center'}`} whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
                      <div className={`overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'w-48 h-32 flex-shrink-0'}`}>
                        <img src={imageUrl} alt={projeto.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className={`flex-grow ${viewMode === 'grid' ? 'p-8' : 'p-6'}`}>
                        <h2 className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-2`}>{projeto.titulo}</h2>
                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">{plainDescription}</p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projetos;
