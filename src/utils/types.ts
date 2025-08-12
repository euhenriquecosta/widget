// Configurações de cores do widget
export interface WidgetColors {
  primary: string;
  secondary: string;
  foreground: string;
  border: string;
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
}