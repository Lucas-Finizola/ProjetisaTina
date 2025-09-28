import React from 'react';
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

// Hooks e componentes do TinaCMS
import { useTinaContent } from '../../hooks/useTinaContent';
import TinaMarkdownRenderer from '../../components/TinaMarkdown';

// Importando os componentes de seção existentes
import HeroSection from '../../components/sections/HeroSection';
import UrgencyBanner from '../../components/sections/UrgencyBanner';
import FaqSection from '../../components/sections/FaqSection';
import VideoSection from '../../components/sections/VideoSection';

const TinaHomePage = () => {
  // Buscar conteúdo da página home do TinaCMS
  const { data: homeData, loading, error } = useTinaContent('page', 'home.md');
  const { data: settingsData } = useTinaContent('settings', 'site.md');

  const scrollToHeroForm = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Dados estáticos que podem ser movidos para o CMS posteriormente
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Erro ao carregar conteúdo:', error);
    // Fallback para a versão original se houver erro
    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section - Versão original */}
        <HeroSection />
        
        {/* Resto do conteúdo original */}
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
  }

  // Versão com conteúdo do TinaCMS
  const page = homeData?.page;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section com conteúdo editável */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white overflow-hidden">
        {/* Background com imagem editável */}
        {page?.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${page.image})` }}
          />
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Conteúdo editável */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {page?.title && (
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {page.title}
                </h1>
              )}
              
              {page?.description && (
                <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">
                  {page.description}
                </p>
              )}

              {/* Conteúdo rich-text editável */}
              {page?.body && (
                <div className="prose prose-lg prose-invert max-w-none">
                  <TinaMarkdownRenderer content={page.body} />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToHeroForm}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
                >
                  Calcular Economia
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  Falar com Especialista
                </motion.button>
              </div>
            </motion.div>

            {/* Formulário (mantém funcionalidade original) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl"
              id="hero-form"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Calcule Sua Economia Agora!
              </h3>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Seu nome completo" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                />
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail (opcional)" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp com DDD" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                />
                <input 
                  type="text" 
                  placeholder="Valor da conta de luz (R$)" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                />
                <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900">
                  <option>Residencial</option>
                  <option>Comercial</option>
                  <option>Industrial</option>
                  <option>Rural</option>
                </select>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <button 
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    📱 Enviar por WhatsApp
                  </button>
                  <button 
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    📧 Enviar por E-mail
                  </button>
                </div>
              </form>
              
              <p className="text-xs text-gray-600 text-center mt-4">
                🔒 Seus dados estão seguros conosco
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resto das seções mantém funcionalidade original */}
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

export default TinaHomePage;

