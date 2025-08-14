declare global {
  interface Window {
    Leadnator: {
      initWidget(config: {
        id?: string;
        title?: string;
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
      }): {
        destroy(): void;
        getConfig(): any;
        updateConfig(config: any): void;
      };
      destroyWidget(id: string): void;
      destroyAllWidgets(): void;
    };
  }
}

export {};
