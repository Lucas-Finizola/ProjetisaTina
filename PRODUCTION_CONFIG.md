# Configuração para Produção - TinaCMS

## Opções de Configuração para Produção

### 1. TinaCloud (Recomendado para facilidade)

**Vantagens:**
- Configuração mais simples
- Hospedagem gerenciada
- Suporte oficial
- Escalabilidade automática

**Passos:**
1. Criar conta no TinaCloud (https://app.tina.io)
2. Conectar repositório GitHub
3. Configurar variáveis de ambiente
4. Atualizar `tina/config.ts` com configurações de produção

**Configuração necessária:**
```typescript
// tina/config.ts
export default defineConfig({
  branch: "main", // ou sua branch principal
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // ... resto da configuração
});
```

### 2. Self-Hosting (Mais controle)

**Vantagens:**
- Controle total sobre dados
- Sem dependência de serviços externos
- Customização completa
- Sem custos de hospedagem do CMS

**Requisitos:**
- Servidor Node.js
- Banco de dados (opcional, pode usar arquivos)
- Configuração de autenticação

**Configuração necessária:**
```typescript
// tina/config.ts
export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
  // ... resto da configuração
});
```

## Configuração Atual do Projeto

O projeto está configurado para **modo local** atualmente. Para produção, recomendamos:

### Opção 1: TinaCloud (Mais Fácil)

1. **Criar conta no TinaCloud**
2. **Conectar repositório GitHub**
3. **Configurar variáveis de ambiente:**
   ```env
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   ```
4. **Atualizar configuração para produção**

### Opção 2: Self-Hosting

1. **Configurar servidor backend**
2. **Implementar autenticação**
3. **Configurar variáveis de ambiente**
4. **Deploy do backend TinaCMS**

## Scripts de Build para Produção

```json
{
  "scripts": {
    "build": "tinacms build && vite build",
    "dev": "tinacms dev -c \"vite\"",
    "start": "vite preview"
  }
}
```

## Variáveis de Ambiente Necessárias

### Para TinaCloud:
```env
NEXT_PUBLIC_TINA_CLIENT_ID=
TINA_TOKEN=
```

### Para Self-Hosting:
```env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_PERSONAL_ACCESS_TOKEN=
```

## Próximos Passos

1. Escolher entre TinaCloud ou Self-Hosting
2. Configurar autenticação
3. Atualizar configuração do TinaCMS
4. Testar em ambiente de produção
5. Configurar CI/CD para deploy automático

