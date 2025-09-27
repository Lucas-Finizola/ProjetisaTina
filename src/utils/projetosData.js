/**
 * Carrega todos os arquivos JSON de projetos da pasta de conteúdo.
 * @returns {Promise<Array<Object>>} Uma lista de objetos de projeto.
 */
export async function getAllProjetos() {
  // Usando import.meta.glob para carregar dinamicamente todos os arquivos .json
  const modules = import.meta.glob('../content/projetos/*.json', { eager: true });
  const projetos = [];

  for (const path in modules) {
    // O conteúdo do JSON está sob a propriedade 'default'
    const projetoData = modules[path].default || modules[path];
    projetos.push(projetoData);
  }

  // Ordena os projetos por ID para consistência
  return projetos.sort((a, b) => a.id - b.id);
}

/**
 * Encontra um projeto específico pelo seu slug.
 * @param {string} slug - O slug do projeto a ser encontrado.
 * @returns {Promise<Object|null>} O objeto do projeto ou null se não for encontrado.
 */
export async function getProjetoBySlug(slug) {
  const todosProjetos = await getAllProjetos();
  // Encontra o projeto que corresponde ao slug fornecido
  return todosProjetos.find(p => p.slug === slug) || null;
}
