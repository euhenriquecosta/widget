declare module 'leadnator-widget' {
  export interface WidgetConfig {
    // Identificação
    id?: string;
    
    // Aparência
    title: string;
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    trigger: 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';
    
    // Cores
    colors: {
      header?: {
        background?: string;
        foreground?: string;
      };
      icon?: {
        background?: string;
        foreground?: string;
      };
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
      other?: {
        border?: string;
        inputText?: string;
        inputPlaceholder?: string;
      };
    };
    
    // Layout da janela
    windowLayout: {
      width: number;
      height: number;
    };
    
    // URL e Integração
    baseURL?: string;               // URL base para o iframe do widget
    flowId?: string;                // FlowId específico (opcional - se não fornecido, tenta extrair da URL atual)
    configEndpoint?: string;        // Endpoint completo para buscar configurações do servidor
    domainEndpoint?: string;        // Endpoint para buscar configuração de domínio
  }

  export interface WidgetInstance {
    destroy(): void;
    getConfig(): WidgetConfig;
    updateConfig(config: Partial<WidgetConfig>): void;
  }

  export interface Leadnator {
    initWidget(config: Partial<WidgetConfig>): Promise<WidgetInstance | null>;
    initWidgetSync(config: WidgetConfig): WidgetInstance;
    destroyWidget(id: string): void;
    destroyAllWidgets(): void;
  }

  export const Leadnator: Leadnator;
  export default Leadnator;
}
