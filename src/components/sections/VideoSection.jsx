import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, PlayCircle, X } from 'lucide-react';

// Utilitários para carregar conteúdo local
import { getContent } from '../../utils/content'; // CORRIGIDO

import '../../embla.css';

// --- Componente Modal (Adaptado para mídias locais) ---
const VideoPlayerModal = ({ testimonial, onClose }) => {
  // A URL do vídeo agora vem diretamente do JSON
  const videoUrl = testimonial?.video?.url;
  const modalRef = useRef();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!videoUrl) {
    console.warn('Modal fechado: URL do vídeo não encontrada.');
    onClose();
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
      >
        <video src={videoUrl} className="w-full aspect-video" controls autoPlay playsInline>
          Seu navegador não suporta a tag de vídeo.
        </video>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1.5 text-black transition-colors"
          aria-label="Fechar vídeo"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- Componente Principal da Seção (Versão Estática) ---
const VideoSection = () => {
  const videoTestimonials = getContent('video-depoimentos') || []; // CORRIGIDO
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', containScroll: 'trimSnaps' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Clientes Reais, Histórias Reais</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Veja o impacto da energia solar na vida e nos negócios de nossos clientes.</p>
        </motion.div>

        {videoTestimonials.length > 0 ? (
          <div className="embla relative">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {videoTestimonials.map((testimonial) => {
                  const { id, nome, descricao, capa, video } = testimonial;
                  if (!video?.url) return null;

                  const posterUrl = capa?.url;

                  return (
                    <div className="embla__slide md:basis-1/2 lg:basis-1/3 p-2" key={id}>
                      <motion.div
                        onClick={() => setSelectedVideo(testimonial)}
                        className="relative group bg-white rounded-lg shadow-lg overflow-hidden h-full cursor-pointer"
                        whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      >
                        <div className="relative aspect-video bg-black">
                          {posterUrl ? (
                            <img src={posterUrl} alt={`Capa do depoimento de ${nome}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-center p-4">
                                <p className="text-gray-400 text-sm">Capa não disponível</p>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 truncate" title={nome}>{nome}</h3>
                          <p className="text-gray-600 text-sm truncate" title={descricao}>{descricao}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="embla__prev" onClick={scrollPrev}><ChevronLeft size={32} /></button>
            <button className="embla__next" onClick={scrollNext}><ChevronRight size={32} /></button>
          </div>
        ) : (
          <p className="text-center text-gray-600">Nenhum depoimento em vídeo disponível no momento.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayerModal testimonial={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;
