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
  id?: string;
  title: string;  // Tornando 'title' obrigatório
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  theme?: 'light' | 'dark';
  autoOpen?: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  welcomeMessage?: string;
  successMessage?: string;
  apiEndpoint?: string;
  apiKey?: string;
  trackingId?: string;
  enableTracking?: boolean;
}