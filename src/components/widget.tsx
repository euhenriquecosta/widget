import { useState, useEffect, useRef } from 'preact/hooks';

interface WidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  title?: string;
  primaryColor?: string;
  theme?: 'light' | 'dark';
  width?: number | string;
  height?: number | string;
}

interface WidgetProps {
  config: WidgetConfig;
}

export function Widget({ config }: WidgetProps) {
  const [isOpen] = useState(true); // já inicia aberto
  const [isMinimized, setIsMinimized] = useState(false);

  const position = config.position || 'bottom-right';
  const theme = config.theme || 'dark';
  const width = config.width || 384;
  const height = config.height || 600;

  const iframeUrl = `http://localhost:5173/widgets?theme=${theme}`;

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.setAttribute('allowtransparency', 'true');
    }
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'WIDGET_MINIMIZE') {
        setIsMinimized(event.data.minimized);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const parseSize = (size: number | string) =>
    typeof size === 'number' ? `${size}px` : size;

  return (
    <div className="fixed z-50" aria-label="Widget de chat">
      {isOpen && (
        <div
          id="chat-iframe-container"
          className={`fixed ${positionClasses[position]} shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out`}
          style={{
            width: isMinimized ? '320px' : parseSize(width),
            height: isMinimized ? '48px' : parseSize(height),
            backgroundColor: 'transparent',
            border: 'none',
            zIndex: 55,
          }}
          role="dialog"
          aria-modal="true"
        >
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title="Chat"
            className="w-full h-full border-0"
            style={{
              backgroundColor: 'transparent',
              colorScheme: 'auto',
            }}
            allow="microphone; camera"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
