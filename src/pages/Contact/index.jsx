import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    address: '', // Campo de endereço adicionado
    message: ''
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
      body: encode({ 'form-name': 'contato', ...formData })
    })
    .then(() => {
      alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!');
      // Limpa o formulário após o envio bem-sucedido
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        address: '', // Limpando o endereço
        message: ''
      });
    })
    .catch(error => alert('Ocorreu um erro ao enviar o formulário: ' + error));
  };

  return (
    <div className="bg-gray-50 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fale Conosco</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tem alguma dúvida ou quer iniciar um projeto? Estamos aqui para ajudar.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Formulário de Contato */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
            <form name="contato" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="contato" />
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Seu nome" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="seu@email.com" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp com DDD</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="(XX) XXXXX-XXXX" required />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Assunto de Interesse</label>
                <input type="text" id="interest" name="interest" value={formData.interest} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ex: Orçamento para Energia Solar" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço (opcional, para agilizar orçamento)</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Rua, Número, Bairro, Cidade" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Sua Mensagem</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Digite aqui os detalhes do seu projeto ou sua dúvida..." required></textarea>
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md hover:shadow-lg">
                Enviar Mensagem
              </button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Canais</h2>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Telefone Fixo</h3>
                <p className="text-gray-600">(83) 2186-7527</p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.75,13.96C17,14.09 17.16,14.16 17.21,14.26C17.27,14.37 17.25,14.87 17,15.44C16.8,16 15.76,16.5 15.3,16.56C14.84,16.62 14.38,16.66 12.63,15.93C10.5,15.05 9,13.2 8.84,13C8.68,12.8 7.64,11.53 7.64,10.2C7.64,8.87 8.33,8.21 8.55,7.99C8.77,7.77 9,7.7 9.2,7.7C9.45,7.7 9.6,7.7 9.75,7.7C9.9,7.7 10,7.7 10.15,8.11C10.29,8.52 10.74,9.73 10.83,9.87C10.92,10 10.83,10.15 10.71,10.27C10.59,10.39 10.5,10.5 10.38,10.62C10.26,10.74 10.15,10.85 10.3,11.1C10.45,11.35 10.9,12.01 11.6,12.64C12.53,13.43 13.13,13.74 13.37,13.85C13.62,13.96 13.73,13.92 13.84,13.8C13.95,13.68 14.12,13.5 14.28,13.32C14.45,13.14 14.65,13.13 14.83,13.18C15,13.23 16.14,13.82 16.36,13.92C16.58,14.02 16.63,14.06 16.75,13.96M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22C13.66,22 15.25,21.54 16.6,20.73L21,22L19.27,17.6C20.45,16.08 21.06,14.1 21,12.08C21,6.5 17,2 12,2M12,4C15.87,4 19,7.13 19,11C19,12.63 18.5,14.16 17.65,15.4L18.83,18.83L15.4,17.65C14.16,18.5 12.63,19 11,19C7.13,19 4,15.87 4,12C4,8.13 7.13,5 11,5C11.33,5 11.66,5.05 12,5.1V4Z" fill="currentColor"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                <a href="https://wa.me/5583996556931" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">(83) 9 9655-6931</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <a href="mailto:contato@projetisa.eng.br" className="text-green-600 hover:underline">contato@projetisa.eng.br</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Endereço</h3>
                <p className="text-gray-600">R. Empresário João Rodrigues Alves, 125 - Sala 910 - Jardim Oceania, João Pessoa - PB, 58037-050</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
                <a href="https://wa.me/5583996556931" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M16.75,13.96C17,14.09 17.16,14.16 17.21,14.26C17.27,14.37 17.25,14.87 17,15.44C16.8,16 15.76,16.5 15.3,16.56C14.84,16.62 14.38,16.66 12.63,15.93C10.5,15.05 9,13.2 8.84,13C8.68,12.8 7.64,11.53 7.64,10.2C7.64,8.87 8.33,8.21 8.55,7.99C8.77,7.77 9,7.7 9.2,7.7C9.45,7.7 9.6,7.7 9.75,7.7C9.9,7.7 10,7.7 10.15,8.11C10.29,8.52 10.74,9.73 10.83,9.87C10.92,10 10.83,10.15 10.71,10.27C10.59,10.39 10.5,10.5 10.38,10.62C10.26,10.74 10.15,10.85 10.3,11.1C10.45,11.35 10.9,12.01 11.6,12.64C12.53,13.43 13.13,13.74 13.37,13.85C13.62,13.96 13.73,13.92 13.84,13.8C13.95,13.68 14.12,13.5 14.28,13.32C14.45,13.14 14.65,13.13 14.83,13.18C15,13.23 16.14,13.82 16.36,13.92C16.58,14.02 16.63,14.06 16.75,13.96M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22C13.66,22 15.25,21.54 16.6,20.73L21,22L19.27,17.6C20.45,16.08 21.06,14.1 21,12.08C21,6.5 17,2 12,2M12,4C15.87,4 19,7.13 19,11C19,12.63 18.5,14.16 17.65,15.4L18.83,18.83L15.4,17.65C14.16,18.5 12.63,19 11,19C7.13,19 4,15.87 4,12C4,8.13 7.13,5 11,5C11.33,5 11.66,5.05 12,5.1V4Z" fill="currentColor"/></svg>
                    Chamar no WhatsApp
                </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
