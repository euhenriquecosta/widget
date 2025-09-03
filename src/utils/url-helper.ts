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
