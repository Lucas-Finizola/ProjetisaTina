// Arquivo helper para mídias.
// Como estamos usando arquivos locais que estão na pasta `public`, 
// a URL do JSON (ex: '/uploads/imagem.png') já é o caminho correto.

/**
 * Retorna a URL de uma imagem. Se a URL não for fornecida, retorna um placeholder.
 * @param {string} url - O caminho da imagem (ex: /uploads/minha-imagem.jpg)
 * @returns {string}
 */
export const getImageUrl = (url) => {
  if (!url) {
    // CORREÇÃO: Substituindo a URL do placeholder por uma que funciona.
    return 'https://placehold.co/1024x768?text=Imagem+Indisponivel';
  }
  // Como as imagens estão na pasta `public`, o caminho relativo funciona diretamente.
  return url;
};
