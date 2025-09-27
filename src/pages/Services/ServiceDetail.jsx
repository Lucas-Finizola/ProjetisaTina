import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, AlertTriangle, ArrowLeft } from 'lucide-react';
import { getAllServicos } from '../../utils/servicosData';
import { getImageUrl } from '../../utils/mediaUtils';

const renderDescription = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    const blockKey = `desc-block-${index}`;
    switch (block.type) {
      case 'heading':
        const Tag = `h${block.level}`;
        return <Tag key={blockKey} className="text-2xl font-bold text-gray-800 my-4">{block.children.map(child => child.text).join('')}</Tag>;
      case 'paragraph':
        return (
          <p key={blockKey} className="text-gray-700 leading-relaxed mb-4">
            {block.children.map((child, childIndex) => {
              const childKey = `p-child-${childIndex}`;
              if (child.bold) {
                return <strong key={childKey}>{child.text}</strong>;
              }
              return <span key={childKey}>{child.text}</span>;
            })}
          </p>
        );
      default:
        return null;
    }
  });
};

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const todosServicos = await getAllServicos();
        const servicoEncontrado = todosServicos.find(s => s.id === parseInt(id, 10));

        if (servicoEncontrado) {
          setService(servicoEncontrado);
        } else {
          setError(`Serviço com ID ${id} não encontrado.`);
        }
      } catch (e) {
        console.error("Erro ao carregar serviços locais:", e);
        setError("Erro ao carregar os dados dos serviços.");
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [id]);

  const phoneNumber = '5583996556931';
  const message = service ? `Olá! Tenho interesse no serviço de "${service.titulo}". Gostaria de um orçamento.` : 'Olá! Gostaria de fazer um orçamento.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // CORRIGIDO: Agora usa service?.imagem?.url para obter o caminho da imagem.
  const imageUrl = getImageUrl(service?.imagem?.url);

  return (
    <div className="bg-white py-20">
        <div className="container mx-auto px-6">
            {loading && <div className="flex justify-center items-center h-64"><Loader className="w-12 h-12 animate-spin text-green-600" /><p className="ml-4 text-xl">Carregando...</p></div>}
            {error && <div className="text-center bg-red-50 p-8 rounded-lg"><AlertTriangle className="w-12 h-12 mx-auto text-red-500"/><p className="text-xl font-bold text-red-700 mt-4">Erro ao carregar serviço</p><p className="text-red-600 mt-2">{error}</p></div>}
            
            {service && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                    <div className="mb-8">
                        <Link to="/services" className="flex items-center text-green-600 hover:text-green-800 font-semibold">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Voltar para todos os serviços
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{service.titulo}</h1>
                    
                    <div className="my-10 shadow-xl rounded-lg overflow-hidden">
                        <img src={imageUrl} alt={service.titulo} className="w-full h-auto object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/800x400/cccccc/000000?text=Erro+na+Imagem'; }}/>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        {renderDescription(service.descricao)}
                    </div>

                    <div className="mt-12 py-10 border-t border-gray-200 text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Pronto para começar?</h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Clique no botão abaixo para falar com um de nossos especialistas e solicitar um orçamento sem compromisso.</p>
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-transform transform hover:scale-105"
                      >
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.486 5.236 3.486 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/>
                        </svg>
                        Solicitar Orçamento via WhatsApp
                      </a>
                    </div>
                </motion.div>
            )}
        </div>
    </div>
  );
};

export default ServiceDetail;
