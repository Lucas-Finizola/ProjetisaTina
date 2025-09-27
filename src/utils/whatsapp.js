/**
 * Gera um link de chat do WhatsApp com uma mensagem predefinida.
 * @param {string} serviceName - O nome do serviço para incluir na mensagem.
 * @returns {string} A URL completa do WhatsApp.
 */
export const generateWhatsAppLink = (serviceName) => {
  const phoneNumber = '5561998341334';
  const baseMessage = `Olá! Gostaria de saber mais sobre o serviço de ${serviceName}.`;
  const encodedMessage = encodeURIComponent(baseMessage);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
