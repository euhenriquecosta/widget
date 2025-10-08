import { fetchWidgetConfigFromServer, mergeWidgetConfigs, fetchDomainConfig, validateCurrentUrl } from './api-helper';
import type { WidgetConfig } from './types';

/**
 * Função para extrair o flowId da URL atual do navegador
 * Suporta diferentes formatos de URL do Leadnator
 */
export function extractFlowIdFromUrl(): string | null {
  try {
    const currentUrl = window.location.href;
    
    // Padrões de URL suportados:
    // 1. https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c
    // 2. https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c/
    // 3. https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c?param=value
    // 4. https://leadnator.com.br/flows/68b4a0d9e64414a59012ca4c#section
    
    const flowIdPattern = /\/flows\/([a-f0-9]{24})/i;
    const match = currentUrl.match(flowIdPattern);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return null;
  } catch (error) {
    console.warn('Erro ao extrair flowId da URL:', error);
    return null;
  }
}

/**
 * Constrói os endpoints da API a partir do flowId
 */
function buildApiEndpoints(flowId: string) {
  const baseApiUrl = 'https://api.leadnator.com.br/api/v1/flows';
  return {
    configEndpoint: `${baseApiUrl}/public/${flowId}/widget-design`,
    domainEndpoint: `${baseApiUrl}/domains/${flowId}`
  };
}

/**
 * Função para buscar configurações do servidor e mesclar com configurações locais
 * Usa o configEndpoint fornecido na configuração local, ou constrói automaticamente a partir do flowId
 * Inclui validação de URL se domainEndpoint for fornecido
 */
export async function getWidgetConfigWithServerDefaults(
  localConfig: Partial<WidgetConfig>
): Promise<WidgetConfig | null> {
  let configEndpoint = localConfig.configEndpoint;
  let domainEndpoint = localConfig.domainEndpoint;
  
  // Se flowId foi fornecido mas os endpoints não, constrói automaticamente
  if (localConfig.flowId && (!configEndpoint || !domainEndpoint)) {
    const endpoints = buildApiEndpoints(localConfig.flowId);
    configEndpoint = configEndpoint || endpoints.configEndpoint;
    domainEndpoint = domainEndpoint || endpoints.domainEndpoint;
    console.log('Endpoints construídos automaticamente a partir do flowId:', { configEndpoint, domainEndpoint });
  }
  
  // Verifica se tem um endpoint de configuração para usar
  if (!configEndpoint) {
    console.warn('flowId ou configEndpoint não fornecido, usando apenas configurações locais');
    return localConfig as WidgetConfig;
  }
  
  try {
    // Se domainEndpoint foi fornecido ou construído, valida a URL antes de continuar
    if (domainEndpoint) {
      console.log('Validando URL atual contra configuração de domínio...');
      const domainConfig = await fetchDomainConfig(domainEndpoint);
      
      if (domainConfig) {
        const isUrlValid = validateCurrentUrl(domainConfig);
        if (!isUrlValid) {
          console.log('URL atual não é válida para este widget, retornando null');
          return null;
        }
      } else {
        console.warn('Não foi possível carregar configuração de domínio, continuando sem validação');
      }
    }
    
    // Busca configurações do servidor usando o endpoint fornecido
    const serverConfig = await fetchWidgetConfigFromServer(configEndpoint);
    
    if (serverConfig) {
      console.log('Configurações carregadas do servidor:', serverConfig);
      // Mescla configurações do servidor com as locais (locais têm prioridade)
      return mergeWidgetConfigs(serverConfig, localConfig);
    } else {
      console.warn('Não foi possível carregar configurações do servidor, usando configurações locais');
      return localConfig as WidgetConfig;
    }
  } catch (error) {
    console.warn('Erro ao buscar configurações do servidor:', error);
    return localConfig as WidgetConfig;
  }
}

/**
 * Função para construir a URL base do widget
 * Se flowId não for fornecido, tenta extrair da URL atual
 */
export function buildWidgetBaseUrl(customBaseUrl?: string, customFlowId?: string): string {
  // Se uma URL customizada foi fornecida, usa ela
  if (customBaseUrl) {
    return customBaseUrl;
  }
  
  // Tenta extrair flowId da URL atual se não foi fornecido
  const flowId = customFlowId || extractFlowIdFromUrl();
  
  if (flowId) {
    return `https://leadnator.com.br/widget?flowId=${flowId}`;
  }
  
  // Fallback para localhost (desenvolvimento)
  return 'http://localhost:3000/widget?flowId=68963b901d3edd1d9dfb13cd';
}

/**
 * Função para validar se um flowId tem o formato correto
 */
export function isValidFlowId(flowId: string): boolean {
  // FlowId deve ter exatamente 24 caracteres hexadecimais
  return /^[a-f0-9]{24}$/i.test(flowId);
}
