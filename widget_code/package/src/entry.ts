// Arquivo de entrada principal para bundlers modernos
import { Leadnator, initWidget, initWidgetSync, destroyWidget, destroyAllWidgets } from './index'
import type { WidgetConfig, WidgetColors, WindowLayout } from './utils/types'
import { Widget } from './components/widget'

export { Leadnator, initWidget, initWidgetSync, destroyWidget, destroyAllWidgets }
export type { WidgetConfig, WidgetColors, WindowLayout }
export { Widget }

// Export default para compatibilidade
export default Leadnator

// Re-export para compatibilidade com CommonJS (apenas para ambientes Node.js)
declare const module: any;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Leadnator
  module.exports.Leadnator = Leadnator
  module.exports.initWidget = initWidget
  module.exports.initWidgetSync = initWidgetSync
  module.exports.destroyWidget = destroyWidget
  module.exports.destroyAllWidgets = destroyAllWidgets
}
