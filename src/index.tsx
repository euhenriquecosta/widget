import { render } from 'preact'
import { Widget } from './components/widget'
import type { WidgetConfig, WidgetColors, WindowLayout } from './utils/types'

import './index.css'

// Função para inicializar o widget
export function initWidget(config: WidgetConfig) {
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
  initWidget,
  destroyWidget,
  destroyAllWidgets
}

// Export default para compatibilidade
export default Leadnator

// Exporta o componente Widget para uso direto
export { Widget }
export type { WidgetConfig, WidgetColors, WindowLayout } 