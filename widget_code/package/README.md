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
- ✅ **Configurações automáticas do servidor** (NOVO!)
- ✅ **Extração automática de flowId da URL** (NOVO!)

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
<script src="https://cdn.jsdelivr.net/npm/leadnator-widget@1.2.0/dist/chat-widget.iife.js"></script>
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
  
  // URL e Integração
  baseURL?: string;               // URL base para o iframe do widget (ex: "https://api.exemplo.com/widget")
  flowId?: string;                // FlowId específico (opcional - se não fornecido, tenta extrair da URL atual)
  
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
// 🚀 NOVO: Widget com configurações automáticas do servidor
Leadnator.initWidget({
  title: "Chat Personalizado", // Apenas esta configuração local
  flowId: "68b4a0d9e64414a59012ca4c",
  configEndpoint: "https://api.leadnator.com.br/api/v1/flows/public/68b4a0d9e64414a59012ca4c/widget-design"
  // Todas as outras configurações (cores, posição, etc.) vêm do servidor!
}).then(widget => {
  console.log('Widget inicializado com configurações do servidor!');
});

// Widget básico (extrai flowId automaticamente da URL)
Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right"
});

// Widget personalizado (sobrescreve configurações do servidor)
Leadnator.initWidget({
  title: "Suporte Técnico",
  position: "bottom-left",
  colors: {
    header: { background: "#10B981", foreground: "#ffffff" },
    icon: { background: "#10B981", foreground: "#ffffff" }
  }
});

// Widget com flowId específico
Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right",
  flowId: "68b4a0d9e64414a59012ca4c"
});

// Widget com URL personalizada
Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right",
  baseURL: "https://api.meusite.com/widget",
  flowId: "12345"
});
```

### 🚀 Configurações Automáticas do Servidor (NOVO!)

O widget agora **busca configurações automaticamente** do servidor Leadnator, tornando a integração muito mais simples!

**Como funciona:**
1. **Recebe o configEndpoint** completo do frontend
2. **Busca configurações** da API usando o endpoint fornecido
3. **Mescla configurações** (servidor + local, com prioridade para as locais)
4. **Fallback inteligente** se a API não estiver disponível

**Exemplo prático:**
```javascript
// Configuração mínima - o resto vem do servidor!
Leadnator.initWidget({
  title: "Chat Personalizado", // Esta configuração local terá prioridade
  flowId: "68b4a0d9e64414a59012ca4c",
  configEndpoint: "https://api.leadnator.com.br/api/v1/flows/public/68b4a0d9e64414a59012ca4c/widget-design"
}).then(widget => {
  console.log('Widget inicializado com configurações do servidor!');
  console.log('Configuração final:', widget.getConfig());
});
```

**API Response Example:**
```json
{
  "title": "Chat de Suporte",
  "position": "bottom-right",
  "trigger": "button",
  "baseURL": "https://chat.leadnator.com.br/chat?flowId=68b4a0d9e64414a59012ca4c",
  "colors": {
    "header": {
      "background": "#6984bf",
      "foreground": "#ffffff"
    },
    "icon": {
      "background": "#435c91",
      "foreground": "#ffffff"
    },
    "chat": {
      "background": "#ffffff",
      "messageUser": {
        "background": "#e5e7eb",
        "foreground": "#1f2937"
      },
      "messageBot": {
        "background": "#f3f4f6",
        "foreground": "#374151"
      }
    },
    "other": {
      "border": "#e5e7eb",
      "inputText": "#1f2937",
      "inputPlaceholder": "#9ca3af"
    }
  },
  "windowLayout": {
    "width": 800,
    "height": 600
  }
}
```

### 🔄 Extração Automática do FlowId

O widget **extrai automaticamente** o `flowId` da URL atual do navegador quando não é fornecido explicitamente.

**URLs suportadas:**
- `https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c`
- `https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c/`
- `https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c?param=value`
- `https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c#section`

**Como funciona:**
1. Se `flowId` for fornecido na configuração → usa o fornecido
2. Se `flowId` não for fornecido → extrai da URL atual
3. Se não conseguir extrair → usa fallback para localhost (desenvolvimento)

**Exemplo prático:**
```javascript
// Na página: https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c
// O widget automaticamente usará o flowId: 68b4a0d9e64414a59012ca4c

Leadnator.initWidget({
  title: "Fale conosco",
  position: "bottom-right"
  // flowId será extraído automaticamente da URL!
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