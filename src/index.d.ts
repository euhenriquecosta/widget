declare module 'leadnator-widget' {
  export interface WidgetConfig {
    // Identificação
    id?: string;
    
    // Aparência
    title?: string;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    primaryColor?: string;
    theme?: 'light' | 'dark';
    
    // Comportamento
    autoOpen?: boolean;
    showAvatar?: boolean;
    showTimestamp?: boolean;
    
    // Personalização
    welcomeMessage?: string;
    successMessage?: string;
    
    // Integração (futuro)
    apiEndpoint?: string;
    apiKey?: string;
    
    // Analytics (futuro)
    trackingId?: string;
    enableTracking?: boolean;
  }

  export interface WidgetInstance {
    destroy(): void;
    getConfig(): WidgetConfig;
    updateConfig(config: Partial<WidgetConfig>): void;
  }

  export interface Leadnator {
    initWidget(config: WidgetConfig): WidgetInstance;
    destroyWidget(id: string): void;
    destroyAllWidgets(): void;
  }

  export const Leadnator: Leadnator;
  export default Leadnator;
}
