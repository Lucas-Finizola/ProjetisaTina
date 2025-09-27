import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, Wind, Handshake, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import { getAllEquipes } from '../../utils/equipesData'; 
import { getImageUrl } from '../../utils/mediaUtils';
import PageContainer from '../../components/common/PageContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const iconMap = {
  Target: <Target className="mx-auto text-green-600 w-12 h-12 mb-4" />,
  Eye: <Eye className="mx-auto text-green-600 w-12 h-12 mb-4" />,
  Gem: <Gem className="mx-auto text-green-600 w-12 h-12 mb-4" />,
  Wind: <Wind className="w-7 h-7 text-green-600" />,
  Handshake: <Handshake className="w-7 h-7 text-green-600" />,
};

const About = () => {
  const [content, setContent] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pageContent = await import('../../content/about/content.json');
        setContent(pageContent.default);

        const teamData = await getAllEquipes();
        const validTeam = (teamData || []).filter(m => m && m.nome).sort((a, b) => (a.ordem || 99) - (b.ordem || 99));
        setTeamMembers(validTeam);

      } catch (error) {
        console.error("Falha ao buscar dados da página Sobre:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !content) {
    return (
      <PageContainer>
        <div className="container mx-auto px-6 py-20 space-y-16">
          <div className="text-center">
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto mt-4" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">{content.hero.title}</motion.h1>
          <motion.p className="text-lg md:text-xl max-w-3xl mx-auto">{content.hero.subtitle}</motion.p>
        </div>
      </section>

      {/* Seção História e Compromisso */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.history.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{content.history.paragraph}</p>
              <div className="space-y-6 mt-6">
                {content.history.features.map(feature => (
                  <div key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0">{iconMap[feature.icon]}</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center mt-8 lg:mt-0">
              {content.history.stats.map(stat => (
                <motion.div key={stat.label} whileHover={{ y: -5 }} className="bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h3 className="text-4xl font-bold text-green-600">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção Pilares (Missão, Visão, Valores) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">{content.pillars.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {content.pillars.items.map(pillar => (
              <motion.div 
                key={pillar.title} 
                whileHover={{ y: -5 }} 
                className="bg-white p-8 rounded-lg shadow-md border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300"
              >
                {iconMap[pillar.icon]}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Onde Atuamos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.area.title}</h2>
              <p className="text-gray-600 leading-relaxed">{content.area.paragraph}</p>
            </div>
            <div className="order-1 lg:order-1">
                <img 
                  src={getImageUrl(content.area.image)}
                  alt={content.area.image.alt}
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/eeeeee/333333?text=Mapa+de+Atua%C3%A7%C3%A3o'; }}
                />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Equipe */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{content.team.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">{content.team.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.documentId || member.id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden text-center border-2 border-transparent hover:border-green-600 hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={getImageUrl(member.foto)}
                  alt={`Foto de ${member.nome}`}
                  className="w-full h-64 object-cover object-center"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/eeeeee/333333?text=Sem+Foto'; }}
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800">{member.nome}</h4>
                  <p className="text-green-600 font-semibold">{member.cargo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section className="bg-green-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{content.cta.subtitle}</p>
          <Link 
            to={content.cta.buttonLink} 
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors inline-flex items-center"
          >
            <span>{content.cta.buttonText}</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};

export default About;
