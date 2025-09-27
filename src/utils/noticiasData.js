// Correção: Usa import.meta.glob do Vite para carregar os arquivos JSON de forma síncrona.
const modules = import.meta.glob('../content/noticias/*.json', { eager: true });

// Extrai o conteúdo de cada módulo. Os arquivos JSON são importados como módulos.
const allNoticias = Object.values(modules).map(module => module.default || module);

/**
 * Retorna todas as notícias.
 * @returns {Array<Object>} Uma lista de objetos de notícias.
 */
export const getAllNoticias = () => {
  return allNoticias;
};

/**
 * Busca uma notícia específica pelo seu slug.
 * @param {string} slug - O slug da notícia a ser encontrada.
 * @returns {Object|undefined} O objeto da notícia, ou undefined se não for encontrado.
 */
export const getNoticiaBySlug = (slug) => {
  return allNoticias.find(noticia => noticia.slug === slug);
};
