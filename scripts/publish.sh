#!/bin/bash

# Script para publicar o widget no GitHub Packages
# Uso: ./scripts/publish.sh [patch|minor|major]

set -e

# Verificar se o GITHUB_TOKEN está definido
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Erro: GITHUB_TOKEN não está definido"
    echo "Configure com: export GITHUB_TOKEN=seu_token_aqui"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erro: Há mudanças não commitadas no repositório"
    echo "Faça commit de todas as mudanças antes de publicar"
    exit 1
fi

# Verificar se estamos na branch main
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Erro: Você deve estar na branch main para publicar"
    exit 1
fi

# Argumento para bump de versão (padrão: patch)
BUMP_TYPE=${1:-patch}

echo "🚀 Publicando widget no GitHub Packages..."
echo "📦 Bump de versão: $BUMP_TYPE"

# Atualizar versão
pnpm version $BUMP_TYPE --no-git-tag-version

# Obter nova versão
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📋 Nova versão: $NEW_VERSION"

# Build do widget
echo "🔨 Fazendo build..."
pnpm build:widget

# Commit das mudanças
git add package.json pnpm-lock.yaml dist/
git commit -m "chore: bump version to $NEW_VERSION and build"

# Tag da versão
git tag "v$NEW_VERSION"

# Push das mudanças e tag
git push origin main
git push origin "v$NEW_VERSION"

# Publicar no npm
echo "📤 Publicando no GitHub Packages..."
pnpm publish --no-git-checks

echo "✅ Widget publicado com sucesso na versão $NEW_VERSION!"
echo "🔗 Acesse: https://github.com/euhenriquecosta/widget/packages"
