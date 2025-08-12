import { X, MessageCircle } from 'lucide-react'
import type { WidgetConfig } from '../utils/types'
import { useWidgetTrigger } from '../utils/hooks'

interface WidgetProps {
  config: WidgetConfig
}

export const Widget = ({ config }: WidgetProps) => {
  const { isOpen, setIsOpen } = useWidgetTrigger({
    trigger: config.trigger
  })

  const handleToggle = () => setIsOpen(!isOpen)

  // Estilos baseados nas cores configuradas
  const buttonStyle = {
    backgroundColor: config.colors.primary,
    color: config.colors.foreground,
  }

  const containerStyle = {
    width: config.windowLayout.width,
    height: config.windowLayout.height,
    backgroundColor: config.colors.secondary,
  }

  const headerStyle = {
    backgroundColor: config.colors.primary,
    color: config.colors.foreground
  }

  return (
    <>
      {/* Botão flutuante - só aparece quando o widget está fechado */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          style={buttonStyle}
          className={`fixed z-50 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 ${config.position.includes('right') ? 'right-6' : 'left-6'
            } ${config.position.includes('bottom') ? 'bottom-6' : 'top-6'
            }`}
        >
          <MessageCircle size={24} fill={config.colors.foreground} />
        </button>
      )}

      {/* Widget principal */}
      {isOpen && (
        <div
          style={containerStyle}
          className={`fixed z-50 rounded-lg shadow-2xl overflow-hidden ${config.position.includes('right') ? 'right-6' : 'left-6'
            } ${config.position.includes('bottom') ? 'bottom-6' : 'top-6'
            }`}
        >
          {/* Header */}
          <div
            style={headerStyle}
            className="flex items-center justify-between px-6 py-4"
          >
            <h3 className="text-lg font-semibold">{config.title}</h3>
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg transition-colors hover:bg-black/20"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conteúdo do widget - iframe ocupa todo o espaço restante */}
          <div className="flex-1" style={{ height: `calc(${config.windowLayout.height}px - 80px)` }}>
            <iframe
              src={`http://localhost:3000/widget?flowId=68963b901d3edd1d9dfb13cd`}
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              className="w-full h-full"
              allow="camera; microphone; geolocation"
            />
          </div>
        </div>
      )}
    </>
  )
}
