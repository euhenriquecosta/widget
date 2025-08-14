# Chat Widget

Um widget de formulário estilo chat desenvolvido com Preact, TypeScript, TailwindCSS e Vite.

## Características

- ✅ Widget embedável em qualquer página
- ✅ Interface de chat passo a passo
- ✅ Validação de formulário
- ✅ Configuração de posição e tema
- ✅ Suporte a múltiplos widgets
- ✅ Responsivo e moderno
- ✅ Desenvolvido com Preact + TypeScript

## Instalação

### Via npm (npmjs.org - Público)

```bash
# Instalar o widget
npm install leadnator-widget

# Ou usando pnpm
pnpm add leadnator-widget
```

### Via CDN (jsDelivr - 100% Público)

```html
<!-- CDN público via jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/leadnator-widget@1.0.0/dist/chat-widget.iife.js"></script>
```

### Uso com TypeScript

```typescript
// Importação padrão (recomendado)
import { Leadnator, WidgetConfig } from 'leadnator-widget';

const config: WidgetConfig = {
  id: "meu-widget",
  title: "Fale conosco",
  position: "bottom-right",
  primaryColor: "#3B82F6",
  theme: "light",
  autoOpen: false,
  showAvatar: true,
  showTimestamp: true,
  welcomeMessage: "Olá! Como posso ajudá-lo?",
  successMessage: "Obrigado! Entraremos em contato em breve."
};

const widget = Leadnator.initWidget(config);

// Atualizar configuração
widget.updateConfig({ theme: "dark" });

// Obter configuração atual
const currentConfig = widget.getConfig();

// Destruir widget
widget.destroy();
```

### Uso com Vite/Webpack (Bundlers modernos)

```typescript
// Para bundlers modernos, use a importação padrão
import Leadnator from 'leadnator-widget';

const widget = Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right"
});
```

### Uso após instalação

```html
<!DOCTYPE html>
<html>
<head>
    <title>Meu Site</title>
</head>
<body>
    <!-- Conteúdo do seu site -->
    
    <!-- Widget Leadnator via CDN público -->
    <script src="https://cdn.jsdelivr.net/npm/leadnator-widget@1.0.0/dist/chat-widget.iife.js"></script>
    <script>
        // Inicializar o widget
        Leadnator.initWidget({
            id: "meu-widget",
            title: "Fale conosco",
            position: "bottom-right",
            primaryColor: "#3B82F6"
        });
    </script>
</body>
</html>
```

## Desenvolvimento

### Instalação

```bash
pnpm install
```

### Executar em modo desenvolvimento

```bash
pnpm dev
```

O widget será carregado automaticamente na página de exemplo (`example.html`).

### Build do widget

```bash
pnpm build:widget
```

Isso gerará os arquivos na pasta `dist/`:
- `chat-widget.umd.cjs` - Para uso em navegadores (UMD)
- `chat-widget.iife.js` - Versão IIFE
- `chat-widget.css` - Estilos CSS

## Uso

### Via script tag

```html
<script src="https://meusite.com/chat-widget.umd.cjs"></script>
<script>
  Leadnator.initWidget({
    id: "meu-widget",
    title: "Fale conosco",
    position: "bottom-right",
    primaryColor: "#3B82F6"
  });
</script>
```

### Configurações disponíveis

```typescript
interface WidgetConfig {
  // Identificação
  id?: string;                    // ID único do widget
  
  // Aparência
  title?: string;                 // Título do widget
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;          // Cor primária (hex)
  theme?: 'light' | 'dark';      // Tema do widget
  
  // Comportamento
  autoOpen?: boolean;             // Abrir automaticamente
  showAvatar?: boolean;           // Mostrar avatar do bot
  showTimestamp?: boolean;        // Mostrar timestamp nas mensagens
  
  // Personalização
  welcomeMessage?: string;        // Mensagem de boas-vindas personalizada
  successMessage?: string;        // Mensagem de sucesso personalizada
  
  // Integração (futuro)
  apiEndpoint?: string;          // Endpoint da API
  apiKey?: string;               // Chave da API
  
  // Analytics (futuro)
  trackingId?: string;           // ID do Google Analytics
  enableTracking?: boolean;      // Habilitar tracking
}
```

### Exemplos de uso

```javascript
// Widget básico
Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right"
});

// Widget personalizado
Leadnator.initWidget({
  id: "suporte",
  title: "Suporte Técnico",
  position: "bottom-left",
  primaryColor: "#10B981",
  theme: "dark",
  showAvatar: true,
  welcomeMessage: "Olá! Como posso ajudá-lo?",
  successMessage: "Obrigado! Entraremos em contato em breve."
});

// Widget com auto-open
Leadnator.initWidget({
  id: "marketing",
  title: "Fale conosco",
  position: "bottom-right",
  primaryColor: "#8B5CF6",
  autoOpen: true,
  showTimestamp: true
});
```

### Gerenciamento de widgets

```javascript
// Destruir widget específico
Leadnator.destroyWidget("meu-widget");

// Destruir todos os widgets
Leadnator.destroyAllWidgets();

// Obter referência do widget
const widget = Leadnator.initWidget({ id: "meu-widget" });
widget.destroy(); // Destruir este widget específico
widget.getConfig(); // Obter configuração atual
```

## Testando

### Desenvolvimento
```bash
pnpm dev
```
Acesse `http://localhost:5173/example.html`

### Build
```bash
pnpm build:widget
```
Acesse `example-build.html` no navegador para testar o widget buildado com diferentes configurações.

## Passos do Formulário

O widget implementa um formulário de 5 passos:

1. **Nome** - Campo de texto obrigatório
2. **E-mail** - Campo de e-mail com validação
3. **Empresa** - Campo de texto opcional
4. **Categoria** - Select com opções predefinidas
5. **Mensagem** - Textarea obrigatório

## Tecnologias

- **Preact** - Framework React-like mais leve
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **pnpm** - Gerenciador de pacotes

## Próximos Passos

- [ ] Integração com backend
- [ ] Temas dark/light completos
- [ ] Animações mais suaves
- [ ] Suporte a múltiplos idiomas
- [ ] Analytics e tracking
- [ ] Upload de arquivos
- [ ] Notificações push 