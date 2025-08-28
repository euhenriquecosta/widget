import { X, MessageCircle } from 'lucide-react'
import type { WidgetConfig } from '../utils/types'
import { useWidgetTrigger } from '../utils/hooks'

interface WidgetProps {
  config: WidgetConfig
}

export const Widget = ({ config }: WidgetProps) => {
  const { isOpen, handleClose, handleToggle } = useWidgetTrigger({
    trigger: config.trigger
  })

  // Função helper para construir a URL do iframe
  const buildIframeUrl = () => {
    const baseUrl = config.baseURL || 'http://localhost:3000/widget?flowId=68963b901d3edd1d9dfb13cd';
    const params = new URLSearchParams();

    // Cores do ícone
    if (config.colors.icon?.background) params.append('iconBackground', config.colors.icon.background);
    if (config.colors.icon?.foreground) params.append('iconForeground', config.colors.icon.foreground);

    // Cores do header
    if (config.colors.header?.background) params.append('headerBackground', config.colors.header.background);
    if (config.colors.header?.foreground) params.append('headerForeground', config.colors.header.foreground);

    // Cores do chat
    if (config.colors.chat?.background) params.append('chatBackground', config.colors.chat.background);
    if (config.colors.chat?.messageUser?.background) params.append('messageUserBackground', config.colors.chat.messageUser.background);
    if (config.colors.chat?.messageUser?.foreground) params.append('messageUserForeground', config.colors.chat.messageUser.foreground);
    if (config.colors.chat?.messageBot?.background) params.append('messageBotBackground', config.colors.chat.messageBot.background);
    if (config.colors.chat?.messageBot?.foreground) params.append('messageBotForeground', config.colors.chat.messageBot.foreground);

    // Outras cores
    if (config.colors.other?.border) params.append('border', config.colors.other.border);
    if (config.colors.other?.inputText) params.append('inputText', config.colors.other.inputText);
    if (config.colors.other?.inputPlaceholder) params.append('inputPlaceholder', config.colors.other.inputPlaceholder);

    return `${baseUrl}&${params.toString()}`;
  };

  // Estilos baseados nas cores configuradas
  const buttonStyle = {
    backgroundColor: config.colors.icon?.background || '#3B82F6',
    color: config.colors.icon?.foreground || '#FFFFFF',
  }

  const containerStyle = {
    width: config.windowLayout.width,
    height: config.windowLayout.height,
    backgroundColor: config.colors.chat?.background || '#FFFFFF',
  }

  const headerStyle = {
    backgroundColor: config.colors.header?.background || '#3B82F6',
    color: config.colors.header?.foreground || '#FFFFFF'
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
          <MessageCircle size={24} fill={config.colors.icon?.foreground || '#FFFFFF'} />
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
            className="flex items-center justify-between px-4 py-3"
          >
            <h3 className="text-lg px-2 font-semibold">{config.title}</h3>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg transition-colors hover:bg-black/20"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conteúdo do widget - iframe ocupa todo o espaço restante */}
          <div className="w-full" style={{ height: `calc(${config.windowLayout.height}px - 72px)` }}>
            <iframe
              src={buildIframeUrl()}
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
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
