// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts/Not\xEDcias",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            ui: {
              description: "URL amig\xE1vel para o post (ex: nova-tecnologia-solar)"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Data de Publica\xE7\xE3o",
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Resumo",
            ui: {
              component: "textarea",
              description: "Breve descri\xE7\xE3o que aparece nas listagens"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            options: [
              "Equipe Projetisa",
              "Engenheiro Respons\xE1vel",
              "Departamento T\xE9cnico"
            ]
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos El\xE9tricos",
              "Sustentabilidade",
              "Inova\xE7\xE3o",
              "Casos de Sucesso"
            ]
          },
          {
            type: "image",
            name: "image",
            label: "Imagem de Capa"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Post em Destaque",
            ui: {
              description: "Marque para destacar este post na p\xE1gina inicial"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conte\xFAdo",
            isBody: true
          }
        ]
      },
      {
        name: "page",
        label: "P\xE1ginas",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "T\xEDtulo da P\xE1gina",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true,
            ui: {
              description: "URL da p\xE1gina (ex: sobre, contato, servicos)"
            }
          },
          {
            type: "string",
            name: "description",
            label: "Descri\xE7\xE3o (SEO)",
            ui: {
              component: "textarea",
              description: "Descri\xE7\xE3o para mecanismos de busca (m\xE1x. 160 caracteres)"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Imagem de Fundo/Hero"
          },
          {
            type: "object",
            name: "seo",
            label: "Configura\xE7\xF5es SEO",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "T\xEDtulo SEO",
                ui: {
                  description: "T\xEDtulo que aparece na aba do navegador"
                }
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Descri\xE7\xE3o",
                ui: {
                  component: "textarea",
                  description: "Descri\xE7\xE3o que aparece nos resultados de busca"
                }
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conte\xFAdo da P\xE1gina",
            isBody: true
          }
        ]
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
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descri\xE7\xE3o Breve",
            ui: {
              component: "textarea",
              description: "Resumo do projeto para listagens"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Data do Projeto",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Imagem Principal"
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
            label: "Localiza\xE7\xE3o",
            ui: {
              description: "Cidade, Estado (ex: Jo\xE3o Pessoa, PB)"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos Estruturais",
              "Projetos El\xE9tricos",
              "Subesta\xE7\xE3o",
              "Rede Subterr\xE2nea",
              "Escava\xE7\xE3o"
            ]
          },
          {
            type: "number",
            name: "power",
            label: "Pot\xEAncia Instalada (kWp)",
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
                label: "Imagem"
              },
              {
                type: "string",
                name: "caption",
                label: "Legenda"
              }
            ]
          },
          {
            type: "object",
            name: "specs",
            label: "Especifica\xE7\xF5es T\xE9cnicas",
            fields: [
              {
                type: "string",
                name: "voltage",
                label: "Tens\xE3o"
              },
              {
                type: "string",
                name: "panels",
                label: "N\xFAmero de Pain\xE9is"
              },
              {
                type: "string",
                name: "inverter",
                label: "Inversor"
              },
              {
                type: "string",
                name: "area",
                label: "\xC1rea Ocupada"
              }
            ]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Projeto em Destaque"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descri\xE7\xE3o Detalhada",
            isBody: true
          }
        ]
      },
      {
        name: "service",
        label: "Servi\xE7os",
        path: "content/services",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome do Servi\xE7o",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descri\xE7\xE3o Breve",
            ui: {
              component: "textarea",
              description: "Resumo do servi\xE7o para cards e listagens"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              "Energia Solar",
              "Projetos Estruturais",
              "Projetos El\xE9tricos",
              "Consultoria",
              "Laudos T\xE9cnicos",
              "Manuten\xE7\xE3o"
            ]
          },
          {
            type: "image",
            name: "icon",
            label: "\xCDcone do Servi\xE7o",
            ui: {
              description: "\xCDcone pequeno para cards (recomendado: 64x64px)"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Imagem do Servi\xE7o"
          },
          {
            type: "number",
            name: "price",
            label: "Pre\xE7o Base (R$)",
            ui: {
              description: "Pre\xE7o inicial ou 'a partir de' (opcional)"
            }
          },
          {
            type: "string",
            name: "duration",
            label: "Prazo de Execu\xE7\xE3o",
            ui: {
              description: "Ex: 15 dias \xFAteis, 1 semana"
            }
          },
          {
            type: "object",
            name: "features",
            label: "Caracter\xEDsticas/Benef\xEDcios",
            list: true,
            fields: [
              {
                type: "string",
                name: "feature",
                label: "Caracter\xEDstica"
              }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "Processo de Execu\xE7\xE3o",
            list: true,
            fields: [
              {
                type: "string",
                name: "step",
                label: "Etapa"
              },
              {
                type: "string",
                name: "description",
                label: "Descri\xE7\xE3o",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Servi\xE7o em Destaque"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descri\xE7\xE3o Detalhada",
            isBody: true
          }
        ]
      },
      {
        name: "settings",
        label: "Configura\xE7\xF5es",
        path: "content/settings",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "**/*"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Nome da Empresa",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Descri\xE7\xE3o da Empresa",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "logo",
            label: "Logo da Empresa"
          },
          {
            type: "object",
            name: "contact",
            label: "Informa\xE7\xF5es de Contato",
            fields: [
              {
                type: "string",
                name: "email",
                label: "E-mail Principal"
              },
              {
                type: "string",
                name: "phone",
                label: "Telefone Principal"
              },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp"
              },
              {
                type: "string",
                name: "address",
                label: "Endere\xE7o Completo",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "city",
                label: "Cidade"
              },
              {
                type: "string",
                name: "state",
                label: "Estado"
              },
              {
                type: "string",
                name: "zipCode",
                label: "CEP"
              }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "Redes Sociais",
            fields: [
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL"
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL"
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL"
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube URL"
              }
            ]
          },
          {
            type: "object",
            name: "business",
            label: "Informa\xE7\xF5es Comerciais",
            fields: [
              {
                type: "string",
                name: "cnpj",
                label: "CNPJ"
              },
              {
                type: "string",
                name: "crea",
                label: "CREA"
              },
              {
                type: "string",
                name: "workingHours",
                label: "Hor\xE1rio de Funcionamento",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "seo",
            label: "Configura\xE7\xF5es SEO Globais",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "T\xEDtulo Padr\xE3o do Site"
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Descri\xE7\xE3o Padr\xE3o do Site",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "image",
                name: "ogImage",
                label: "Imagem para Redes Sociais",
                ui: {
                  description: "Imagem que aparece quando o site \xE9 compartilhado"
                }
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
