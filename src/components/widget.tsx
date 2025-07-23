import { useState, useEffect, useRef } from 'preact/hooks';
import { MessageCircle, Minimize2, Maximize2, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
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

  // Escuta mensagens do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'WIDGET_MINIMIZE') {
        setIsMinimized(event.data.minimized);
      } else if (event.data.type === 'WIDGET_CLOSE') {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const parseSize = (size: number | string) =>
    typeof size === 'number' ? `${size}px` : size;

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };


  if (!isOpen) {
    return (
      <div className="fixed z-50">
        <button
          onClick={handleOpen}
          className={`fixed ${positionClasses[position]} flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-200`}
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
      </div>
    );
  }


  if (isMinimized) {
    return (
      <div className="fixed z-50">
        <button
          onClick={handleMaximize}
          className={`fixed ${positionClasses[position]} flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-200`}
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: config.primaryColor || '#4F46E5',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            zIndex: 60,
          }}
          aria-label="Maximizar chat"
        >
          <MessageCircle size={28} />
        </button>
      </div>
    );
  }


  return (
    <div className="fixed z-50">
      <div
        className={`fixed ${positionClasses[position]} shadow-xl transition-all duration-300 ease-in-out flex flex-col`}
        style={{
          width: parseSize(width),
          height: parseSize(height),
          borderRadius: '0.75rem',
          overflow: 'hidden',
          zIndex: 55,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        }}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="flex items-center justify-between px-4 py-4 flex-shrink-0"
          style={{
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f8f9fa',
            borderBottom: theme === 'dark' ? '1px solid #404040' : '1px solid #e9ecef',
            color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
            minHeight: '64px',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.primaryColor || '#4F46E5' }}
            />
            <span className="font-semibold text-sm">Leadnator</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinimize}
              className="p-2"
              style={{ 
                color: '#888888',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Minimizar"
            >
              <Minimize2 size={16} />
            </button>
            
            <button
              onClick={handleClose}
              className="p-2"
              style={{ 
                color: '#888888',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title="Chat"
            className="w-full h-full border-0 block"
            style={{
              backgroundColor: 'transparent',
              display: 'block',
            }}
            allow="microphone; camera"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}