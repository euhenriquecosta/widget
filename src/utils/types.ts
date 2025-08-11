export interface WidgetConfig {
  id?: string;
  title: string;
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