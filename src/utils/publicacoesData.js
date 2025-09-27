import { getCollection } from './content'; // CORRIGIDO

const COLLECTION_NAME = 'publicacoes';

/**
 * Busca todas as publicações da coleção 'publicacoes'.
 * @returns {Promise<Array<Object>>}
 */
export async function getAllPublicacoes() {
  return await getCollection(COLLECTION_NAME);
}

/**
 * Busca uma única publicação pelo seu documentId.
 * @param {string} documentId
 * @returns {Promise<Object|undefined>}
 */
export async function getPublicacaoByDocumentId(documentId) {
  const allPublicacoes = await getAllPublicacoes();
  return allPublicacoes.find(p => p.documentId === documentId);
}
