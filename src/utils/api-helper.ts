import type { WidgetConfig, DomainConfig } from './types';

// Interface para a resposta da API
interface ApiWidgetConfig {
  title: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  trigger: 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';
  baseURL: string;
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
  windowLayout: {
    width: number;
    height: number;
  };
}

// Função para buscar configurações do servidor
export async function fetchWidgetConfigFromServer(configEndpoint: string): Promise<WidgetConfig | null> {
  try {
    const response = await fetch(configEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Erro ao buscar configurações do servidor: ${response.status}`);
      return null;
    }

    const apiConfig: ApiWidgetConfig = await response.json();
    
    // Converter para o formato do WidgetConfig
    const widgetConfig: WidgetConfig = {
      title: apiConfig.title,
      position: apiConfig.position,
      trigger: apiConfig.trigger,
      baseURL: apiConfig.baseURL,
      colors: {
        header: apiConfig.colors.header,
        icon: apiConfig.colors.icon,
        chat: apiConfig.colors.chat,
        other: apiConfig.colors.other,
      },
      windowLayout: apiConfig.windowLayout,
    };

    return widgetConfig;
  } catch (error) {
    console.warn('Erro ao buscar configurações do servidor:', error);
    return null;
  }
}

// Função para mesclar configurações (servidor + local)
export function mergeWidgetConfigs(
  serverConfig: WidgetConfig | null,
  localConfig: Partial<WidgetConfig>
): WidgetConfig {
  // Se não há configuração do servidor, usa apenas a local
  if (!serverConfig) {
    return localConfig as WidgetConfig;
  }

  // Mescla as configurações, priorizando a local
  return {
    title: localConfig.title || serverConfig.title,
    position: localConfig.position || serverConfig.position,
    trigger: localConfig.trigger || serverConfig.trigger,
    baseURL: localConfig.baseURL || serverConfig.baseURL,
    colors: {
      header: { ...serverConfig.colors.header, ...localConfig.colors?.header },
      icon: { ...serverConfig.colors.icon, ...localConfig.colors?.icon },
      chat: {
        ...serverConfig.colors.chat,
        ...localConfig.colors?.chat,
        messageUser: {
          ...serverConfig.colors.chat?.messageUser,
          ...localConfig.colors?.chat?.messageUser,
        },
        messageBot: {
          ...serverConfig.colors.chat?.messageBot,
          ...localConfig.colors?.chat?.messageBot,
        },
      },
      other: { ...serverConfig.colors.other, ...localConfig.colors?.other },
    },
    windowLayout: {
      ...serverConfig.windowLayout,
      ...localConfig.windowLayout,
    },
  };
}

// Função para buscar configuração de domínio
export async function fetchDomainConfig(domainEndpoint: string): Promise<DomainConfig | null> {
  try {
    const response = await fetch(domainEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Erro ao buscar configuração de domínio: ${response.status}`);
      return null;
    }

    const domainConfig: DomainConfig = await response.json();
    return domainConfig;
  } catch (error) {
    console.warn('Erro ao buscar configuração de domínio:', error);
    return null;
  }
}

// Função para validar se a URL atual corresponde à URL configurada
export function validateCurrentUrl(domainConfig: DomainConfig): boolean {
  try {
    const currentHost = window.location.hostname;
    
    // Se o domínio está inativo, não renderiza
    if (domainConfig.status !== 'active') {
      console.log('Domínio inativo, widget não será renderizado');
      return false;
    }
    
    // Verifica se a URL configurada corresponde ao host atual
    const configuredUrl = domainConfig.url.toLowerCase().replace(/^https?:\/\//, '');
    const currentHostLower = currentHost.toLowerCase();
    
    // Verifica se o host atual corresponde à URL configurada
    if (currentHostLower !== configuredUrl && !currentHostLower.endsWith('.' + configuredUrl)) {
      console.log(`URL atual (${currentHost}) não corresponde à URL configurada (${configuredUrl}), widget não será renderizado`);
      return false;
    }
    
    // Se há paths configurados, verifica se a URL atual corresponde a algum deles
    if (domainConfig.paths && domainConfig.paths.length > 0) {
      const currentPath = window.location.pathname;
      const pathMatches = domainConfig.paths.some(path => {
        // Remove barra inicial se existir
        const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
        const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
        
        // Verifica se o path atual começa com o path configurado
        return normalizedCurrentPath.startsWith(normalizedPath);
      });
      
      if (!pathMatches) {
        console.log(`Path atual (${currentPath}) não corresponde aos paths configurados (${domainConfig.paths.join(', ')}), widget não será renderizado`);
        return false;
      }
    }
    
    console.log('URL validada com sucesso, widget será renderizado');
    return true;
  } catch (error) {
    console.warn('Erro ao validar URL atual:', error);
    return false;
  }
}
