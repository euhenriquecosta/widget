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

// Configuração principal do widget
export interface WidgetConfig {
  title: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  trigger: 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';
  colors: WidgetColors;
  windowLayout: WindowLayout;
  baseURL?: string; // URL base para o iframe do widget
}