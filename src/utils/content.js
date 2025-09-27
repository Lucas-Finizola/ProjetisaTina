// src/utils/content.js

// --- Para Arquivos de Conteúdo Únicos (ex: home-hero.json) ---

// Importa todos os arquivos .json diretamente da pasta /content.
// eager: true garante que eles sejam carregados imediatamente e de forma síncrona.
const singleContentModules = import.meta.glob('/src/content/*.json', { eager: true });
const singleContentCache = new Map();

/**
 * Busca o conteúdo de um único arquivo JSON pelo seu nome (slug).
 * Esta função é síncrona.
 * @param {string} slug - O nome do arquivo sem a extensão (ex: 'home-hero').
 * @returns {Object|null} - O conteúdo do arquivo JSON ou null se não encontrado.
 */
export function getContent(slug) {
  const cacheKey = `single_${slug}`;
  if (singleContentCache.has(cacheKey)) {
    return singleContentCache.get(cacheKey);
  }

  const path = `/src/content/${slug}.json`;
  const module = singleContentModules[path];

  if (!module || typeof module.default === 'undefined') {
    console.error(`[content.js] Conteúdo não encontrado para o slug: "${slug}". Verifique se o arquivo "/src/content/${slug}.json" existe.`);
    return null;
  }

  const content = module.default;
  singleContentCache.set(cacheKey, content);
  return content;
}


// --- Para Coleções de Conteúdo (ex: /projetos/*.json) ---

// Importa dinamicamente os arquivos .json de TODAS as subpastas de /content.
// Esta é uma importação "preguiçosa" (lazy), que retorna funções de carregamento (Promises).
const collectionModules = import.meta.glob('/src/content/*/*.json');
const collectionCache = new Map();

/**
 * Busca todo o conteúdo de uma coleção específica (uma subpasta dentro de /content).
 * Esta função é assíncrona.
 * @param {string} collectionName - O nome da pasta da coleção (ex: 'projetos').
 * @returns {Promise<Array<Object>>} - Uma promessa que resolve para um array com o conteúdo de todos os arquivos.
 */
export async function getCollection(collectionName) {
  if (collectionCache.has(collectionName)) {
    return collectionCache.get(collectionName);
  }

  const collectionPathPrefix = `/src/content/${collectionName}/`;
  
  // Filtra a lista de todos os módulos para pegar apenas os da coleção desejada.
  const relevantPaths = Object.keys(collectionModules).filter(path => path.startsWith(collectionPathPrefix));

  if (relevantPaths.length === 0) {
    console.warn(`[content.js] Nenhum conteúdo encontrado para a coleção: "${collectionName}". Verifique se a pasta "/src/content/${collectionName}/" existe e contém arquivos JSON.`);
    return [];
  }

  // Mapeia os caminhos para as promessas de carregamento e as executa.
  const loadingPromises = relevantPaths.map(path => collectionModules[path]());
  const loadedModules = await Promise.all(loadingPromises);

  // Extrai o conteúdo 'default' de cada módulo carregado.
  const collectionContent = loadedModules.map(module => module.default);

  collectionCache.set(collectionName, collectionContent);
  return collectionContent;
}