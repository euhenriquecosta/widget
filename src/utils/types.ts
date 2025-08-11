export type WidgetSize = 'small' | 'medium' | 'large';

export type WidgetTheme = 
  | 'light'
  | 'dark'
  | 'whatsapp'
  | 'default'
  | 'custom';

export type WidgetTrigger = 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';

export interface WidgetColors {
  headerBackground?: string; // Ex: '#FFFFFF' ou 'rgb(255,255,255)'
  headerText?: string;
  bubbleUser?: string;
  bubbleBot?: string;
  background?: string;
}

export interface WidgetConfig {
  id?: string;
  title: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: WidgetSize; // P, M, G
  theme?: WidgetTheme; // temas pré-montados, incluindo WhatsApp
  colors?: WidgetColors; // personalização granular de cores
  
  // 🚀 NOVAS OPÇÕES DE ACIONAMENTO
  trigger?: WidgetTrigger; // 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent'
  autoOpenDelay?: number; // delay em ms para abertura automática
  scrollThreshold?: number; // % da página para abrir ao fazer scroll (0-100)
  
  // Configurações de tamanho e cores
  width?: number | string;
  height?: number | string;
  primaryColor?: string;
  
  // Configurações existentes
  autoOpen?: boolean;
  endpoint?: string;
}