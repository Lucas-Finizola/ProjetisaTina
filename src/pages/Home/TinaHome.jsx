import React from 'react';
import { useTina } from "tinacms/dist/react";
import { client } from "../../../tina/__generated__/client";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sun,
  Zap,
  Leaf,
  TrendingUp,
  Shield,
  DollarSign,
  Building,
  ArrowRight,
  Construction
} from 'lucide-react';

// Importando os novos componentes de seção
import HeroSection from '../../components/sections/HeroSection';
import UrgencyBanner from '../../components/sections/UrgencyBanner';
import FaqSection from '../../components/sections/FaqSection';
import VideoSection from '../../components/sections/VideoSection';

const TinaHome = (props) => {
  // Use Tina to make the page editable
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  const scrollToHeroForm = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const benefits = [
    { icon: <DollarSign className="w-8 h-8" />, title: "Economia de até 95%", description: "Reduza drasticamente sua conta de luz e proteja-se dos aumentos tarifários." },
    { icon: <Leaf className="w-8 h-8" />, title: "100% Sustentável", description: "Contribua para um futuro mais verde utilizando energia limpa e renovável." },
    { icon: <TrendingUp className="w-8 h-8" />, title: "Valoriza seu Imóvel", description: "Aumente o valor de mercado da sua propriedade com tecnologia moderna." },
    { icon: <Shield className="w-8 h-8" />, title: "Garantia de 25 Anos", description: "Sistemas duráveis com garantia estendida e baixíssima manutenção." }
  ];

  const processSteps = [
    { step: "1", title: "Simulação Gratuita", description: "Análise personalizada do seu consumo e potencial de economia." },
    { step: "2", title: "Projeto Personalizado", description: "Engenheiros criam um projeto sob medida para suas necessidades." },
    { step: "3", title: "Instalação Profissional", description: "Nossa equipe realiza a instalação de forma rápida e segura." },
    { step: "4", title: "Economia Imediata", description: "Seu sistema é conectado à rede e você já começa a economizar." }
  ];

  const otherServices = [
    { icon: <Sun className="w-10 h-10" />, title: "Estrutura de Solo para Placas Solares", description: "Soluções robustas para aproveitar ao máximo a energia solar." },
    { icon: <Zap className="w-10 h-10" />, title: "Rede Subterrânea de Média Tensão", description: "Solução moderna para distribuição de energia, com instalação confiável." },
    { icon: <Building className="w-10 h-10" />, title: "Montagem de Subestação Abrigada", description: "Soluções completas e confiáveis para suas necessidades de energia." },
    { icon: <Construction className="w-10 h-10" />, title: "Escavação Mecanizada", description: "Eficiência e produtividade no processo de escavação para suas obras." }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section - Agora como um componente importado */}
      <HeroSection />

      {/* Urgency Banner Section */}
      <UrgencyBanner scrollToHeroForm={scrollToHeroForm} />

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por Que Escolher Energia Solar?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Descubra as vantagens que só a energia solar pode oferecer.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-green-600 mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Independência Energética em 4 Passos</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Nosso processo é simples, rápido e transparente.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.15 }} className="bg-white p-6 rounded-xl text-center z-10">
                        <div className="relative inline-block mb-4">
                            <div className="w-16 h-16 bg-green-600 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-lg">{step.step}</div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Video Testimonials Section - Agora como um componente importado */}
      <VideoSection />
      
      {/* Other Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Soluções Completas em Engenharia Elétrica</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Além da energia solar, a Projetisa oferece um portfólio completo de serviços para atender seu projeto.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherServices.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} whileHover={{ y: -5 }} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 text-center">
                <div className="text-green-600 mb-5 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <Link to="/services" className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg inline-flex items-center">
                <span>Ver Todos os Serviços</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Agora como um componente importado */}
      <FaqSection />

      {/* Final CTA */}
      <section id="simulacao" className="py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Não Perca Mais Tempo e Dinheiro!</h2>
                <p className="text-xl mb-8">A cada mês, você perde a chance de economizar e de investir em um futuro sustentável.</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={scrollToHeroForm} className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-lg font-bold text-xl transition-colors shadow-lg">QUERO MINHA SIMULAÇÃO GRATUITA</motion.button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TinaHome;

// Function to get static props for the page
export const getStaticProps = async () => {
  const tinaProps = await client.queries.page({
    relativePath: "home.md",
  });

  return {
    props: {
      ...tinaProps,
    },
  };
};

