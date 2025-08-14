// Arquivo de entrada principal para bundlers modernos
export { Leadnator, initWidget, destroyWidget, destroyAllWidgets } from './index'
export type { WidgetConfig, WidgetColors, WindowLayout } from './utils/types'
export { Widget } from './components/widget'

// Export default para compatibilidade
export default Leadnator

// Re-export para compatibilidade com CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Leadnator
  module.exports.Leadnator = Leadnator
  module.exports.initWidget = initWidget
  module.exports.destroyWidget = destroyWidget
  module.exports.destroyAllWidgets = destroyAllWidgets
}
