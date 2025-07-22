export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  step?: number;
}

export interface FormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  category: string;
}

export interface ChatStep {
  id: number;
  question: string;
  field: keyof FormData;
  type: 'text' | 'email' | 'select' | 'textarea';
  options?: string[];
  required: boolean;
  validation?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
}

export interface WidgetConfig {
  // Identificação
  id?: string;                    // ID único do widget (futuramente para múltiplos widgets)
  
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