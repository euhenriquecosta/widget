import { render } from 'preact'
import { Widget } from './components/widget'
import type { WidgetConfig, WidgetColors, WindowLayout } from './utils/types'
import { getWidgetConfigWithServerDefaults } from './utils/url-helper'

import './index.css'

// Função para inicializar o widget com configurações do servidor
export async function initWidget(config: Partial<WidgetConfig>) {
  try {
    // Busca configurações do servidor e mescla com as locais
    const finalConfig = await getWidgetConfigWithServerDefaults(config);
    
    // Se a validação de URL falhou, retorna null
    if (!finalConfig) {
      console.log('Widget não será inicializado devido à validação de URL');
      return null;
    }
    
    // Validação básica da configuração final
    if (!finalConfig.title || !finalConfig.position || !finalConfig.trigger || !finalConfig.colors || !finalConfig.windowLayout) {
      throw new Error('Configuração inválida: todas as propriedades obrigatórias devem ser fornecidas')
    }

    // Cria um container para o widget
    const container = document.createElement('div')
    container.id = 'chat-widget-container'
    document.body.appendChild(container)

    // Renderiza o widget
    render(<Widget config={finalConfig} />, container)

    return {
      destroy: () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      },
      getConfig: () => finalConfig,
      updateConfig: (newConfig: Partial<WidgetConfig>) => {
        Object.assign(finalConfig, newConfig)
      }
    }
  } catch (error) {
    console.error('Erro ao inicializar widget:', error);
    throw error;
  }
}

// Função para inicializar o widget sem buscar configurações do servidor (compatibilidade)
export function initWidgetSync(config: WidgetConfig) {
  // Validação básica da configuração
  if (!config.title || !config.position || !config.trigger || !config.colors || !config.windowLayout) {
    throw new Error('Configuração inválida: todas as propriedades obrigatórias devem ser fornecidas')
  }

  // Cria um container para o widget
  const container = document.createElement('div')
  container.id = 'chat-widget-container'
  document.body.appendChild(container)

  // Renderiza o widget
  render(<Widget config={config} />, container)

  return {
    destroy: () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
    },
    getConfig: () => config,
    updateConfig: (newConfig: Partial<WidgetConfig>) => {
      Object.assign(config, newConfig)
    }
  }
}

// Função para destruir widget específico
export function destroyWidget(id: string) {
  const container = document.querySelector(`#${id}`)
  if (container && container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

// Função para destruir todos os widgets
export function destroyAllWidgets() {
  const containers = document.querySelectorAll('#chat-widget-container')
  containers.forEach(container => {
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  })
}

// Objeto principal Leadnator
export const Leadnator = {
  initWidget, // Nova função assíncrona que busca configurações do servidor
  initWidgetSync, // Função síncrona para compatibilidade
  destroyWidget,
  destroyAllWidgets
}

// Export default para compatibilidade
export default Leadnator

// Exporta o componente Widget para uso direto
export { Widget }
export type { WidgetConfig, WidgetColors, WindowLayout } 