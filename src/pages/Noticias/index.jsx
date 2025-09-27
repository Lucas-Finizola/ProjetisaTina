import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { List, Grid, Loader, AlertTriangle } from 'lucide-react';
import { getAllNoticias } from '../../utils/noticiasData'; // Agora vamos usar a função real
import { getImageUrl } from '../../utils/mediaUtils';

const Noticias = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNoticias = async () => {
      setLoading(true);
      try {
        const todasNoticias = await getAllNoticias(); // Usando a função para carregar os dados
        // Ordena as notícias da mais recente para a mais antiga
        const noticiasOrdenadas = (todasNoticias || []).sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticias(noticiasOrdenadas);
      } catch (e) {
        console.error('Erro ao buscar notícias:', e);
        setError('Ocorreu um erro ao carregar as notícias.');
      } finally {
        setLoading(false);
      }
    };
    loadNoticias();
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    <div className="bg-gray-50">
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Notícias e Artigos
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mantenha-se atualizado com as últimas tendências, tecnologias e projetos do setor de energia e engenharia.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 min-h-[70vh]">
        <div className="flex justify-end items-center mb-12">
          <div className="flex space-x-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><Grid /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><List /></button>
          </div>
        </div>

        {loading && <div className="flex justify-center items-center h-64"><Loader className="animate-spin text-green-600 w-12 h-12" /></div>}
        {error && <div className="text-center bg-red-50 p-8 rounded-lg"><AlertTriangle className="mx-auto text-red-500 w-12 h-12"/><p className="mt-4 text-xl text-red-700">{error}</p></div>}

        {!loading && !error && noticias.length === 0 && (
            <div className="text-center text-gray-500">
                <p className="text-xl mb-4">Ainda não há notícias publicadas.</p>
                <p>Volte em breve para conferir as novidades!</p>
            </div>
        )}

        {!loading && !error && noticias.length > 0 && (
          <motion.div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"} variants={containerVariants} initial="hidden" animate="visible">
            {noticias.map((noticia) => {
              const imageUrl = getImageUrl(noticia.imagem?.url);

              return (
                <motion.div key={noticia.slug} variants={itemVariants}>
                  <Link to={`/noticias/${noticia.slug}`} className="block h-full">
                    <motion.div className={`bg-white rounded-xl shadow-lg overflow-hidden flex group ${viewMode === 'grid' ? 'flex-col h-full' : 'flex-row items-center'}`} whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
                      <div className={`overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'w-48 h-32 flex-shrink-0'}`}>
                        <img src={imageUrl} alt={noticia.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className={`flex-grow ${viewMode === 'grid' ? 'p-8' : 'p-6'}`}>
                        <p className='text-sm font-semibold text-green-600 mb-2'>{noticia.categoria}</p>
                        <h2 className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-2`}>{noticia.titulo}</h2>
                        <p className="text-gray-500 text-sm">{new Date(noticia.data).toLocaleDateString('pt-BR')}</p>
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

export default Noticias;
