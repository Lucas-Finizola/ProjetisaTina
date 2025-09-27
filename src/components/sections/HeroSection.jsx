
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Phone,
  Mail,
} from 'lucide-react';
import heroImage from '../../assets/images/projetisa_projeto_exemplo.png';
import { getContent } from '../../utils/content'; // CORRIGIDO
import WhatsappIcon from '../common/WhatsappIcon';

const HeroSection = () => {
  const heroContent = getContent('home-hero'); // CORRIGIDO

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consumption: '',
    propertyType: 'residencial'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'simulacao', ...formData })
    })
    .then(() => {
      alert('Obrigado! Sua simulação foi enviada com sucesso. Entraremos em contato em breve!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        consumption: '',
        propertyType: 'residencial'
      });
    })
    .catch(error => alert('Ocorreu um erro ao enviar o formulário: ' + error));
  };

  const handleWhatsAppSubmit = () => {
    const { name, email, phone, consumption, propertyType } = formData;
    if (!name || !phone || !consumption) {
      alert('Por favor, preencha pelo menos os campos de nome, WhatsApp e valor da conta.');
      return;
    }
    const message = `Olá, equipe da Projetisa!\n\nGostaria de solicitar um orçamento. Seguem meus dados:\n\n- *Nome:* ${name}\n- *WhatsApp:* ${phone}\n- *E-mail:* ${email || 'Não informado'}\n- *Valor da Conta:* R$ ${consumption}\n- *Propriedade:* ${propertyType}\n\nAguardo contato.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5583996556931&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    alert('Preparando sua mensagem para o WhatsApp...');

    // Limpa o formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      consumption: '',
      propertyType: 'residencial'
    });
  };
  
  if (!heroContent) {
    return <div>Carregando conteúdo da hero section...</div>;
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {heroContent.title} <span className="text-yellow-400">{heroContent.titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200" dangerouslySetInnerHTML={{ __html: heroContent.subtitle }} />
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={heroContent.primaryButton.link} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center">
                <Phone className="mr-2 w-5 h-5" />
                {heroContent.primaryButton.text}
              </motion.a>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              {heroContent.checklist && heroContent.checklist.map((item, index) => (
                <div key={index} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-2" /><span>{item}</span></div>
              ))}
            </div>
          </motion.div>
          <motion.div id="hero-form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{heroContent.formTitle}</h3>
            <form name="simulacao" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="form-name" value="simulacao" />
              <input type="text" name="name" placeholder="Seu nome completo" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900" required />
              <input type="email" name="email" placeholder="Seu melhor e-mail (opcional)" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900" />
              <input type="tel" name="phone" placeholder="WhatsApp com DDD" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900" required />
              <input type="number" name="consumption" placeholder="Valor da conta de luz (R$)" value={formData.consumption} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900" required />
              <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900">
                <option value="residencial">Residencial</option><option value="comercial">Comercial</option><option value="industrial">Industrial</option><option value="rural">Rural</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={handleWhatsAppSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold text-base transition-colors flex items-center justify-center"><WhatsappIcon className="mr-2 w-5 h-5" /> Enviar por WhatsApp</motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold text-base transition-colors flex items-center justify-center"><Mail className="mr-2 w-5 h-5" /> Enviar por E-mail</motion.button>
              </div>
            </form>
            <p className="text-xs text-gray-600 text-center mt-4">✓ Seus dados estão seguros conosco</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
