// jamstack-site/src/utils/servicosData.js

/**
 * Carrega todos os arquivos JSON de serviços da pasta de conteúdo.
 * @returns {Array<Object>} Uma lista de objetos de serviço.
 */
export async function getAllServicos() {
  const modules = import.meta.glob('../content/servicos/*.json', { eager: true });
  const servicos = [];

  for (const path in modules) {
    const servicoData = modules[path].default;
    servicos.push(servicoData);
  }
  return servicos;
}
