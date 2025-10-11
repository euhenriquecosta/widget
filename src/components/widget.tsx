import { X, MessageCircle } from 'lucide-react'
import type { WidgetConfig } from '../utils/types'
import { useWidgetTrigger } from '../utils/hooks'
import { buildWidgetBaseUrl, extractTrackingParams } from '../utils/url-helper'

interface WidgetProps {
  config: WidgetConfig
}

export const Widget = ({ config }: WidgetProps) => {
  const { isOpen, handleClose, handleToggle } = useWidgetTrigger({
    trigger: config.trigger
  })

  const buildIframeUrl = () => {
    const baseUrl = buildWidgetBaseUrl(config.baseURL, config.flowId);
    const params = new URLSearchParams();

    // Adiciona parâmetros de cores
    if (config.colors.icon?.background) params.append('iconBackground', config.colors.icon.background);
    if (config.colors.icon?.foreground) params.append('iconForeground', config.colors.icon.foreground);

    if (config.colors.header?.background) params.append('headerBackground', config.colors.header.background);
    if (config.colors.header?.foreground) params.append('headerForeground', config.colors.header.foreground);

    if (config.colors.chat?.background) params.append('chatBackground', config.colors.chat.background);
    if (config.colors.chat?.messageUser?.background) params.append('messageUserBackground', config.colors.chat.messageUser.background);
    if (config.colors.chat?.messageUser?.foreground) params.append('messageUserForeground', config.colors.chat.messageUser.foreground);
    if (config.colors.chat?.messageBot?.background) params.append('messageBotBackground', config.colors.chat.messageBot.background);
    if (config.colors.chat?.messageBot?.foreground) params.append('messageBotForeground', config.colors.chat.messageBot.foreground);

    if (config.colors.other?.border) params.append('border', config.colors.other.border);
    if (config.colors.other?.inputText) params.append('inputText', config.colors.other.inputText);
    if (config.colors.other?.inputPlaceholder) params.append('inputPlaceholder', config.colors.other.inputPlaceholder);

    // Extrai e adiciona parâmetros de rastreamento da URL global
    const trackingParams = extractTrackingParams();
    Object.entries(trackingParams).forEach(([key, value]) => {
      params.append(key, value);
    });

    return `${baseUrl}&${params.toString()}`;
  };

  const buttonStyle = {
    backgroundColor: config.colors.icon?.background || '#3B82F6',
    color: config.colors.icon?.foreground || '#FFFFFF',
  }

  const containerStyle = {
    width: config.windowLayout.width,
    height: config.windowLayout.height,
    zIndex: 999,
    backgroundColor: config.colors.chat?.background || '#FFFFFF',
  }

  const headerStyle = {
    backgroundColor: config.colors.header?.background || '#3B82F6',
    color: config.colors.header?.foreground || '#FFFFFF'
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleToggle}
          style={buttonStyle}
          className={`fixed z-50 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 ${
            config.position.includes('right') ? 'right-6' : 'left-6'
          } ${config.position.includes('bottom') ? 'bottom-6' : 'top-6'}`}
        >
          <MessageCircle size={24} fill={config.colors.icon?.foreground || '#FFFFFF'} />
        </button>
      )}

      {isOpen && (
        <div
          style={containerStyle}
          className={`fixed z-50 rounded-lg shadow-2xl overflow-hidden ${
            config.position.includes('right') ? 'right-6' : 'left-6'
          } ${config.position.includes('bottom') ? 'bottom-6' : 'top-6'}`}
        >
          <div style={headerStyle} className="flex items-center justify-between px-4 py-3">
            <h3 className="text-lg px-2 font-semibold">{config.title}</h3>
            <button onClick={handleClose} className="p-2 rounded-lg transition-colors hover:bg-black/20">
              <X size={20} />
            </button>
          </div>

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
              onLoad={(e) => {
                const iframeDoc = (e.target as HTMLIFrameElement).contentDocument;
                if (!iframeDoc) return;

                const style = iframeDoc.createElement('style');
                style.innerHTML = `
                  /* Reset para impedir CSS do Elementor de vazar */
                  * {
                    box-sizing: border-box !important;
                    border-radius: 0 !important;
                    border: none !important;
                    box-shadow: none !important;
                  }
                  html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                  }
                  button {
                    cursor: pointer;
                  }
                `;
                iframeDoc.head.appendChild(style);
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
