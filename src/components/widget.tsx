import { useState, useEffect, useRef } from 'preact/hooks';
import { MessageCircle } from 'lucide-react'; // <== novo ícone

interface WidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  theme?: 'light' | 'dark';
  width?: number | string;
  height?: number | string;
}

interface WidgetProps {
  config: WidgetConfig;
}

export function Widget({ config }: WidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
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
      if (event.data?.type === 'WIDGET_CLOSE') {
        setIsOpen(false);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const parseSize = (size: number | string) =>
    typeof size === 'number' ? `${size}px` : size;

  const handleReopen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return (
    <div className="fixed z-50">
      {/* Se NÃO estiver aberto, mostra apenas a bolinha */}
      {!isOpen && (
        <button
          onClick={handleReopen}
          className={`fixed ${positionClasses[position]} flex items-center justify-center rounded-full shadow-lg`}
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: config.primaryColor || '#4F46E5',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            zIndex: 60,
          }}
          aria-label="Abrir chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Se estiver aberto */}
      {isOpen && (
        <div
          id="chat-iframe-container"
          className={`fixed ${positionClasses[position]} shadow-xl transition-all duration-300 ease-in-out`}
          style={{
            width: isMinimized ? '64px' : parseSize(width),
            height: isMinimized ? '64px' : parseSize(height),
            borderRadius: isMinimized ? '50%' : '0.5rem',
            overflow: 'hidden',
            zIndex: 55,
            backgroundColor: isMinimized
              ? config.primaryColor || '#4F46E5'
              : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          role="dialog"
          aria-modal="true"
        >
          {isMinimized ? (
            <button
              onClick={() => {
                setIsMinimized(false);
                setIsOpen(true);
              }}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <MessageCircle size={28} />
            </button>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}
