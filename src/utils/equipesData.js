// jamstack-site/src/utils/equipesData.js

/**
 * Carrega todos os arquivos JSON de equipes da pasta de conteúdo.
 * @returns {Array<Object>} Uma lista de objetos de membro da equipe.
 */
export async function getAllEquipes() {
  const modules = import.meta.glob('../content/equipes/*.json', { eager: true });
  const equipes = [];

  for (const path in modules) {
    const equipeData = modules[path].default;
    equipes.push(equipeData);
  }
  return equipes;
}
