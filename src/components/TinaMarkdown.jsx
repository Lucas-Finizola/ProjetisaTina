import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const TinaMarkdownRenderer = ({ content, className = "" }) => {
  if (!content) return null;

  // Se o conteúdo é do tipo rich-text do TinaCMS
  if (content && typeof content === 'object' && content.children) {
    return (
      <div className={className}>
        <TinaMarkdown content={content} />
      </div>
    );
  }

  // Se o conteúdo é markdown simples
  if (typeof content === 'string') {
    return (
      <div className={className}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return null;
};

export default TinaMarkdownRenderer;

