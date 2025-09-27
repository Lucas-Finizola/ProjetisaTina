import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllNoticias } from '../../utils/noticiasData';
import { getImageUrl } from '../../utils/mediaUtils';
import ReactMarkdown from 'react-markdown'; // Importa o ReactMarkdown
import { Loader, AlertTriangle, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const getNoticiaBySlug = (slug) => {
  const noticias = getAllNoticias();
  return noticias.find(noticia => noticia.slug === slug);
};

const NoticiaDetail = () => {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNoticia = () => {
      setLoading(true);
      try {
        const data = getNoticiaBySlug(slug);
        if (data) {
          setNoticia(data);
        } else {
          setError('Notícia não encontrada.');
        }
      } catch (e) {
        console.error("Erro ao carregar detalhes da notícia:", e);
        setError("Ocorreu um erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadNoticia();
    }
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="w-16 h-16 animate-spin text-green-600" /></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{error}</h2>
        <Link to="/noticias" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Notícias
        </Link>
      </div>
    );
  }

  if (!noticia) return null;

  const imageUrl = getImageUrl(noticia.imagem?.url);

  return (
    <div className="bg-white font-sans">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {/* Cabeçalho com Imagem de Destaque */}
        <div className="h-[50vh] md:h-[60vh] relative flex items-end justify-center text-white overflow-hidden p-6 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10"></div>
          {imageUrl && <img src={imageUrl} alt={noticia.titulo} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="relative z-20 w-full max-w-4xl">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="flex items-center space-x-4 text-sm mb-2">
                  <span className="inline-flex items-center bg-green-600 px-3 py-1 rounded-full text-white font-semibold">
                      <Tag className="w-4 h-4 mr-2"/> 
                      {noticia.categoria}
                  </span>
                  <span className="inline-flex items-center">
                      <Calendar className="w-4 h-4 mr-2"/>
                      {new Date(noticia.data).toLocaleDateString('pt-BR')}
                  </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold shadow-text leading-tight">
                {noticia.titulo}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Conteúdo da Notícia */}
        <div className="container mx-auto max-w-4xl py-16 lg:py-24 px-6">
          <Link to="/noticias" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-12 text-lg font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para todas as notícias
          </Link>

          <div className="prose prose-lg max-w-none prose-h2:font-bold prose-p:text-gray-700 prose-a:text-green-600">
            <ReactMarkdown>{noticia.corpo}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoticiaDetail;
