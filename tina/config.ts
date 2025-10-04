import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  //clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  //token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts/Notícias",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            ui: {
              description: "URL amigável para o post (ex: nova-tecnologia-solar)"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Data de Publicação",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Resumo",
            ui: {
              component: "textarea",
              description: "Breve descrição que aparece nas listagens"
            },
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            options: [
              "Equipe Projetisa",
              "Engenheiro Responsável",
              "Departamento Técnico"
            ]
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos Elétricos",
              "Sustentabilidade",
              "Inovação",
              "Casos de Sucesso"
            ]
          },
          {
            type: "image",
            name: "image",
            label: "Imagem de Capa",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Post em Destaque",
            ui: {
              description: "Marque para destacar este post na página inicial"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conteúdo",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Páginas",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título da Página",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            ui: {
              description: "URL da página (ex: sobre, contato, servicos)"
            }
          },
          {
            type: "string",
            name: "description",
            label: "Descrição (SEO)",
            ui: {
              component: "textarea",
              description: "Descrição para mecanismos de busca (máx. 160 caracteres)"
            },
          },
          {
            type: "image",
            name: "image",
            label: "Imagem de Fundo/Hero",
          },
          {
            type: "object",
            name: "seo",
            label: "Configurações SEO",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Título SEO",
                ui: {
                  description: "Título que aparece na aba do navegador"
                }
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Descrição",
                ui: {
                  component: "textarea",
                  description: "Descrição que aparece nos resultados de busca"
                }
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conteúdo da Página",
            isBody: true,
          },
        ],
      },
      {
        name: "project",
        label: "Projetos",
        path: "content/projects",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome do Projeto",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrição Breve",
            ui: {
              component: "textarea",
              description: "Resumo do projeto para listagens"
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Data do Projeto",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Imagem Principal",
          },
          {
            type: "string",
            name: "client",
            label: "Cliente",
            ui: {
              description: "Nome do cliente ou tipo (ex: Residencial, Comercial)"
            }
          },
          {
            type: "string",
            name: "location",
            label: "Localização",
            ui: {
              description: "Cidade, Estado (ex: João Pessoa, PB)"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos Estruturais",
              "Projetos Elétricos",
              "Subestação",
              "Rede Subterrânea",
              "Escavação"
            ],
          },
          {
            type: "number",
            name: "power",
            label: "Potência Instalada (kWp)",
            ui: {
              description: "Para projetos de energia solar"
            }
          },
          {
            type: "object",
            name: "gallery",
            label: "Galeria de Imagens",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Imagem",
              },
              {
                type: "string",
                name: "caption",
                label: "Legenda",
              },
            ],
          },
          {
            type: "object",
            name: "specs",
            label: "Especificações Técnicas",
            fields: [
              {
                type: "string",
                name: "voltage",
                label: "Tensão",
              },
              {
                type: "string",
                name: "panels",
                label: "Número de Painéis",
              },
              {
                type: "string",
                name: "inverter",
                label: "Inversor",
              },
              {
                type: "string",
                name: "area",
                label: "Área Ocupada",
              }
            ]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Projeto em Destaque",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descrição Detalhada",
            isBody: true,
          },
        ],
      },
      {
        name: "service",
        label: "Serviços",
        path: "content/services",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome do Serviço",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrição Breve",
            ui: {
              component: "textarea",
              description: "Resumo do serviço para cards e listagens"
            },
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos Estruturais",
              "Projetos Elétricos",
              "Consultoria",
              "Laudos Técnicos",
              "Manutenção"
            ],
          },
          {
            type: "image",
            name: "icon",
            label: "Ícone do Serviço",
            ui: {
              description: "Ícone pequeno para cards (recomendado: 64x64px)"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Imagem do Serviço",
          },
          {
            type: "number",
            name: "price",
            label: "Preço Base (R$)",
            ui: {
              description: "Preço inicial ou 'a partir de' (opcional)"
            }
          },
          {
            type: "string",
            name: "duration",
            label: "Prazo de Execução",
            ui: {
              description: "Ex: 15 dias úteis, 1 semana"
            }
          },
          {
            type: "object",
            name: "features",
            label: "Características/Benefícios",
            list: true,
            fields: [
              {
                type: "string",
                name: "feature",
                label: "Característica",
              },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Processo de Execução",
            list: true,
            fields: [
              {
                type: "string",
                name: "step",
                label: "Etapa",
              },
              {
                type: "string",
                name: "description",
                label: "Descrição",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Serviço em Destaque",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descrição Detalhada",
            isBody: true,
          },
        ],
      },
      {
        name: "settings",
        label: "Configurações",
        path: "content/settings",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome da Empresa",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrição da Empresa",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "logo",
            label: "Logo da Empresa",
          },
          {
            type: "object",
            name: "contact",
            label: "Informações de Contato",
            fields: [
              {
                type: "string",
                name: "email",
                label: "E-mail Principal",
              },
              {
                type: "string",
                name: "phone",
                label: "Telefone Principal",
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp",
              },
              {
                type: "string",
                name: "address",
                label: "Endereço Completo",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "city",
                label: "Cidade",
              },
              {
                type: "string",
                name: "state",
                label: "Estado",
              },
              {
                type: "string",
                name: "zipCode",
                label: "CEP",
              }
            ],
          },
          {
            type: "object",
            name: "social",
            label: "Redes Sociais",
            fields: [
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL",
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL",
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube URL",
              },
            ],
          },
          {
            type: "object",
            name: "business",
            label: "Informações Comerciais",
            fields: [
              {
                type: "string",
                name: "cnpj",
                label: "CNPJ",
              },
              {
                type: "string",
                name: "crea",
                label: "CREA",
              },
              {
                type: "string",
                name: "workingHours",
                label: "Horário de Funcionamento",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "seo",
            label: "Configurações SEO Globais",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Título Padrão do Site",
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Descrição Padrão do Site",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "ogImage",
                label: "Imagem para Redes Sociais",
                ui: {
                  description: "Imagem que aparece quando o site é compartilhado"
                }
              }
            ]
          }
        ],
      },
    ],
  },
});

