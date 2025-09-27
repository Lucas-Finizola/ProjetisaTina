import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Grid, List } from 'lucide-react';
import { getAllServicos } from '../../utils/servicosData';
import { getImageUrl } from '../../utils/mediaUtils';
import { Skeleton } from '@/components/ui/skeleton';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const servicesData = await getAllServicos();
        setServices(servicesData.sort((a, b) => (a.id || 99) - (b.id || 99)));
      } catch (error) {
        console.error("Falha ao buscar serviços:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };
  const cardVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 } };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12"><Skeleton className="h-12 w-1/2 mx-auto" /><Skeleton className="h-8 w-3/4 mx-auto mt-4" /></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden"><Skeleton className="w-full h-56 object-cover" /><div className="p-6"><Skeleton className="h-6 w-3/4 mb-4" /><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-5/6" /></div></div>)}</div>
      </div>
    );
  }

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.5 }} className="bg-gray-50">
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Nossos Serviços</motion.h1>
          <motion.p className="text-lg md:text-xl max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>Soluções completas e inovadoras em energia e infraestrutura para atender às suas necessidades com máxima eficiência e segurança.</motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-end items-center mb-12">
            <div className="flex space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><Grid /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}><List /></button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="initial"
                whileInView="in"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/servicos/${service.id}`}>
                  <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row items-center'}`}>
                    <img 
                      src={getImageUrl(service.imagem.url)}
                      alt={`Imagem para ${service.titulo}`}
                      className={`${viewMode === 'grid' ? 'w-full h-56' : 'w-48 h-32'} object-cover`}
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/eeeeee/333333?text=Servi%C3%A7o'; }}
                    />
                    <div className={`p-6 flex flex-col ${viewMode === 'grid' ? 'flex-grow' : ''}`}>
                      <h3 className={`text-xl font-bold text-gray-800 mb-3 ${viewMode === 'grid' ? 'h-20' : ''}`}>{service.titulo}</h3>
                      {viewMode === 'grid' && <div className="flex-grow"></div>}
                      <div className="mt-4 inline-flex items-center font-semibold text-green-600 hover:text-green-800 transition-colors">
                        Saiba Mais
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
