# Guia de Publicação - GitHub Packages

Este guia explica como publicar o widget Leadnator no GitHub Packages para distribuição via npm.

## Pré-requisitos

1. **GitHub Token**: Você precisa de um token de acesso pessoal com permissões `packages:write`
2. **Repositório**: O repositório deve estar no GitHub
3. **Node.js**: Versão 18 ou superior
4. **pnpm**: Gerenciador de pacotes

## Configuração Inicial

### 1. Criar GitHub Token

1. Acesse [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Clique em "Generate new token (classic)"
3. Selecione os escopos:
   - `repo` (acesso completo ao repositório)
   - `write:packages` (publicar pacotes)
   - `read:packages` (ler pacotes)
4. Copie o token gerado

### 2. Configurar Autenticação

```bash
# Configurar o token como variável de ambiente
export GITHUB_TOKEN=seu_token_aqui

# Ou adicionar ao seu ~/.zshrc ou ~/.bashrc
echo 'export GITHUB_TOKEN=seu_token_aqui' >> ~/.zshrc
source ~/.zshrc
```

### 3. Configurar npm para GitHub Packages

```bash
# Configurar o registry para o escopo do seu usuário
npm config set @euhenriquecosta:registry https://npm.pkg.github.com

# Fazer login no GitHub Packages
npm login --scope=@euhenriquecosta --registry=https://npm.pkg.github.com
```

## Publicação

### Opção 1: Script Automatizado (Recomendado)

```bash
# Publicar com bump de versão patch (1.0.0 -> 1.0.1)
./scripts/publish.sh

# Publicar com bump de versão minor (1.0.0 -> 1.1.0)
./scripts/publish.sh minor

# Publicar com bump de versão major (1.0.0 -> 2.0.0)
./scripts/publish.sh major
```

### Opção 2: Manual

```bash
# 1. Atualizar versão
pnpm version patch --no-git-tag-version

# 2. Fazer build
pnpm build:widget

# 3. Commit das mudanças
git add package.json pnpm-lock.yaml dist/
git commit -m "chore: bump version and build"

# 4. Tag da versão
git tag "v$(node -p "require('./package.json').version)"

# 5. Push das mudanças e tag
git push origin main
git push origin --tags

# 6. Publicar
pnpm publish --no-git-checks
```

### Opção 3: GitHub Actions (Automático)

O workflow `.github/workflows/publish.yml` publica automaticamente quando você:

1. Cria um release no GitHub
2. O workflow faz build e publica no GitHub Packages

## Verificação

Após a publicação, verifique:

1. **GitHub Packages**: https://github.com/euhenriquecosta/widget/packages
2. **Versão**: Confirme se a versão foi atualizada
3. **Arquivos**: Verifique se os arquivos estão na pasta `dist/`

## Instalação pelos Usuários

### Via npm

```bash
# Configurar registry
npm config set @euhenriquecosta:registry https://npm.pkg.github.com

# Instalar
npm install @euhenriquecosta/leadnator-widget
```

### Via pnpm

```bash
# Configurar registry
pnpm config set @euhenriquecosta:registry https://npm.pkg.github.com

# Instalar
pnpm add @euhenriquecosta/leadnator-widget
```

### Via CDN

```html
<script src="https://npm.pkg.github.com/@euhenriquecosta/leadnator-widget/dist/chat-widget.umd.js"></script>
```

## Troubleshooting

### Erro: "You must be logged in to publish packages"

```bash
# Fazer login novamente
npm login --scope=@euhenriquecosta --registry=https://npm.pkg.github.com
```

### Erro: "Package name must be scoped"

O nome do pacote deve seguir o padrão `@username/package-name`. Já está configurado como `@euhenriquecosta/leadnator-widget`.

### Erro: "Insufficient permissions"

Verifique se o token tem as permissões necessárias:
- `repo`
- `write:packages`
- `read:packages`

### Erro: "Registry not found"

```bash
# Verificar configuração do registry
npm config get @euhenriquecosta:registry

# Deve retornar: https://npm.pkg.github.com
```

## Estrutura do Pacote

Após a publicação, o pacote conterá:

```
@euhenriquecosta/leadnator-widget/
├── package.json
├── README.md
├── dist/
│   ├── chat-widget.umd.js
│   ├── chat-widget.iife.js
│   └── chat-widget.css
└── src/
    └── components/
        └── widget.tsx
```

## Próximos Passos

- [ ] Configurar CI/CD para publicação automática
- [ ] Adicionar testes automatizados
- [ ] Configurar dependências peer
- [ ] Adicionar TypeScript definitions
- [ ] Configurar monorepo se necessário
