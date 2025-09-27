import React from 'react';

// Esta função renderiza um único nó de texto, aplicando estilos como negrito, itálico, etc.
const renderText = (child, index) => {
  let element = <>{child.text}</>;
  if (child.bold) {
    element = <strong key={`text-${index}`}>{element}</strong>;
  }
  if (child.italic) {
    element = <em key={`text-${index}`}>{element}</em>;
  }
  if (child.underline) {
    element = <u key={`text-${index}`}>{element}</u>;
  }
  return <React.Fragment key={`text-frag-${index}`}>{element}</React.Fragment>;
}

// Esta função renderiza um bloco de conteúdo (parágrafo, título, lista)
const renderBlock = (block, index) => {
  const children = block.children.map(renderText);

  switch (block.type) {
    case 'heading':
      // Cria uma tag de título H1, H2, etc, com base no 'level' do bloco
      const Tag = `h${block.level}`;
      return <Tag key={index} className={`text-${4 - block.level}xl font-bold my-4`}>{children}</Tag>;
    
    case 'paragraph':
      return <p key={index} className="leading-relaxed mb-4">{children}</p>;

    case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return <ListTag key={index} className="list-disc list-inside mb-4 pl-4">{children}</ListTag>;

    case 'list-item':
        return <li key={index}>{children}</li>;

    default:
      // Ignora tipos de bloco não reconhecidos
      return null;
  }
};

/**
 * Renderiza uma árvore de conteúdo "rich text" (do Strapi/Decap) para elementos React.
 * @param {Array} blocks - O array contido no campo de rich text (ex: `projeto.descricao`).
 */
export const renderRichText = (blocks) => {
  if (!Array.isArray(blocks)) {
    return null;
  }
  return blocks.map(renderBlock);
};

/**
 * Extrai o texto puro do primeiro parágrafo de uma árvore de rich text.
 * @param {Array} blocks - O array de rich text.
 * @returns {string} - O texto do primeiro parágrafo ou uma string vazia.
 */
export const extractFirstParagraphText = (blocks) => {
  if (!Array.isArray(blocks)) {
    return '';
  }

  const firstParagraph = blocks.find(block => block.type === 'paragraph');
  if (!firstParagraph || !firstParagraph.children) {
    return '';
  }

  return firstParagraph.children
    .filter(child => child.type === 'text')
    .map(child => child.text)
    .join('');
};
