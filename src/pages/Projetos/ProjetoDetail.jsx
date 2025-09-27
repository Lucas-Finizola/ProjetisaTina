import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjetoBySlug } from '../../utils/projetosData';
import { getImageUrl } from '../../utils/mediaUtils';
import ReactMarkdown from 'react-markdown'; // Importa o ReactMarkdown
import { Loader, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjetoDetail = () => {
  const { slug } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjeto = async () => {
      setLoading(true);
      try {
        const data = await getProjetoBySlug(slug);
        if (data) {
          setProjeto(data);
        } else {
          setError('Projeto não encontrado.');
        }
      } catch (e) {
        console.error("Erro ao carregar detalhes do projeto:", e);
        setError("Ocorreu um erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadProjeto();
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
        <Link to="/projetos" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para Projetos
        </Link>
      </div>
    );
  }

  if (!projeto) return null;

  const imageUrl = getImageUrl(projeto.imagem?.url);

  return (
    <div className="bg-white font-sans">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="h-[50vh] md:h-[60vh] relative flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          {imageUrl && <img src={imageUrl} alt={projeto.titulo} className="absolute inset-0 w-full h-full object-cover" />}
          <div className="relative z-20 text-center p-6">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold shadow-text">
              {projeto.titulo}
            </motion.h1>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl py-16 lg:py-24 px-6">
          <Link to="/projetos" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-12 text-lg font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para todos os projetos
          </Link>

          <div className="prose prose-lg max-w-none prose-h2:font-bold prose-p:text-gray-700 prose-a:text-green-600">
            <ReactMarkdown>{projeto.descricao}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjetoDetail;
