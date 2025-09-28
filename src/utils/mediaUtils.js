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

/**
 * Utilitários para gerenciamento de mídia integrado com TinaCMS
 */

// Configurações de mídia
export const MEDIA_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedVideoTypes: ['video/mp4', 'video/webm'],
  allowedDocTypes: ['application/pdf', 'text/plain'],
  uploadPath: '/uploads/',
  thumbnailSizes: {
    small: { width: 150, height: 150 },
    medium: { width: 300, height: 300 },
    large: { width: 800, height: 600 }
  }
};

/**
 * Valida se o arquivo é do tipo permitido
 * @param {File} file - Arquivo a ser validado
 * @param {string} category - Categoria do arquivo (image, video, document)
 * @returns {boolean}
 */
export function validateFileType(file, category = 'image') {
  const allowedTypes = {
    image: MEDIA_CONFIG.allowedImageTypes,
    video: MEDIA_CONFIG.allowedVideoTypes,
    document: MEDIA_CONFIG.allowedDocTypes
  };

  return allowedTypes[category]?.includes(file.type) || false;
}

/**
 * Valida o tamanho do arquivo
 * @param {File} file - Arquivo a ser validado
 * @param {number} maxSize - Tamanho máximo em bytes
 * @returns {boolean}
 */
export function validateFileSize(file, maxSize = MEDIA_CONFIG.maxFileSize) {
  return file.size <= maxSize;
}

/**
 * Gera um nome único para o arquivo
 * @param {string} originalName - Nome original do arquivo
 * @returns {string}
 */
export function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${sanitizedName}-${timestamp}-${random}.${extension}`;
}

/**
 * Formata tamanho do arquivo para exibição
 * @param {number} bytes - Tamanho em bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Integração com TinaCMS Media API
 */
export class TinaCMSMediaManager {
  constructor(config = {}) {
    this.config = { ...MEDIA_CONFIG, ...config };
  }

  /**
   * Faz upload de arquivo para TinaCMS
   * @param {File} file - Arquivo a ser enviado
   * @returns {Promise<Object>}
   */
  async uploadFile(file) {
    try {
      // Validações
      if (!validateFileSize(file, this.config.maxFileSize)) {
        throw new Error(`Arquivo muito grande. Máximo: ${formatFileSize(this.config.maxFileSize)}`);
      }

      // Gera nome único
      const fileName = generateUniqueFileName(file.name);
      
      // Em produção, aqui seria feita a integração real com TinaCMS
      // Por enquanto, simula o upload
      const formData = new FormData();
      formData.append('file', file, fileName);
      
      // Simula resposta da API
      return {
        url: `${this.config.uploadPath}${fileName}`,
        filename: fileName,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  /**
   * Lista arquivos de mídia
   * @returns {Promise<Array>}
   */
  async listFiles() {
    // Em produção, faria chamada para API do TinaCMS
    // Por enquanto, retorna lista vazia
    return [];
  }

  /**
   * Remove arquivo
   * @param {string} filename - Nome do arquivo
   * @returns {Promise<boolean>}
   */
  async deleteFile(filename) {
    // Em produção, faria chamada para API do TinaCMS
    console.log(`Removendo arquivo: ${filename}`);
    return true;
  }
}

// Instância padrão do gerenciador
export const mediaManager = new TinaCMSMediaManager();
