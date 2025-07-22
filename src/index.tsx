import { render } from 'preact';
import { Widget } from './components/widget';
import type { WidgetConfig } from './utils/types';
import './index.css';

// Mapa para gerenciar múltiplos widgets
const widgetInstances = new Map<string, HTMLDivElement>();

export function initWidget(config: WidgetConfig = {}) {
  const widgetId = config.id || 'default-widget';

  // Remove widget existente se houver
  const existingContainer = widgetInstances.get(widgetId);
  if (existingContainer && document.body.contains(existingContainer)) {
    document.body.removeChild(existingContainer);
  }

  // Cria container para o widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = `chat-widget-${widgetId}`;
  widgetContainer.className = 'chat-widget-container';
  document.body.appendChild(widgetContainer);

  // Armazena referência do container
  widgetInstances.set(widgetId, widgetContainer);

  // Renderiza o widget
  render(<Widget config={config} />, widgetContainer);

  // Retorna função para destruir o widget
  return {
    destroy: () => {
      if (widgetContainer && document.body.contains(widgetContainer)) {
        document.body.removeChild(widgetContainer);
        widgetInstances.delete(widgetId);
      }
    },
    getConfig: () => config
  };
}

// Função para destruir widget específico
export function destroyWidget(widgetId: string = 'default-widget') {
  const container = widgetInstances.get(widgetId);
  if (container && document.body.contains(container)) {
    document.body.removeChild(container);
    widgetInstances.delete(widgetId);
  }
}

// Função para destruir todos os widgets
export function destroyAllWidgets() {
  widgetInstances.forEach((container) => {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  });
  widgetInstances.clear();
}

// Expõe as funções globalmente para uso via script tag
if (typeof window !== 'undefined') {
  (window as any).ChatWidget = {
    initWidget,
    destroyWidget,
    destroyAllWidgets
  };
} 