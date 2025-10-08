// Configurações de cores do widget
export interface WidgetColors {
  // Cores do header do widget
  header?: {
    background?: string;
    foreground?: string;
  };
  
  // Cores do ícone flutuante
  icon?: {
    background?: string;
    foreground?: string;
  };
  
  // Cores do chat interno
  chat?: {
    background?: string;
    messageUser?: {
      background?: string;
      foreground?: string;
    };
    messageBot?: {
      background?: string;
      foreground?: string;
    };
  };
  
  // Outras cores
  other?: {
    border?: string;
    inputText?: string;
    inputPlaceholder?: string;
  };
}

// Configurações de layout da janela
export interface WindowLayout {
  width: number;
  height: number;
}

// Interface para resposta da API de domínio
export interface DomainConfig {
  _id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
  paths: string[];
}

// Configuração principal do widget
export interface WidgetConfig {
  title: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  trigger: 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';
  colors: WidgetColors;
  windowLayout: WindowLayout;
  baseURL?: string; // URL base para o iframe do widget
  flowId?: string; // FlowId específico (opcional - se não fornecido, tenta extrair da URL atual)
  configEndpoint?: string; // Endpoint completo para buscar configurações do servidor
  domainEndpoint?: string; // Endpoint para buscar configuração de domínio
}