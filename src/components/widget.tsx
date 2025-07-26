import { useState, useEffect, useRef } from 'preact/hooks';
import { Minimize2, X } from 'lucide-react';

interface WidgetConfig {
  title: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  theme?: 'light' | 'dark';
  width?: number | string;
  height?: number | string;
}

interface WidgetProps {
  config: WidgetConfig;
}

const ChatIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.298 22 8.685 21.575 7.26 20.82L2 22L3.18 16.74C2.425 15.315 2 13.702 2 12C2 6.477 6.477 2 12 2Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <circle cx="8" cy="12" r="1.5" fill="white" fillOpacity="0.9" />
    <circle cx="12" cy="12" r="1.5" fill="white" fillOpacity="0.9" />
    <circle cx="16" cy="12" r="1.5" fill="white" fillOpacity="0.9" />
  </svg>
);

export function Widget({ config }: WidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const position = config.position ?? 'bottom-right';
  const theme = config.theme ?? 'dark';
  const width = config.width ?? 384;
  const height = config.height ?? 600;

  const flowId = '688389642e4b04b550bc269c';
  const iframeUrl = `http://localhost:5173/widgets?theme=${theme}&flowId=${flowId}`;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.setAttribute('allowtransparency', 'true');
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'WIDGET_MINIMIZE') setIsMinimized(event.data.minimized);
      if (event.data?.type === 'WIDGET_CLOSE') {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const parseSize = (size: number | string): string => (typeof size === 'number' ? `${size}px` : size);
  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };
  const handleMinimize = () => setIsMinimized(true);
  const handleMaximize = () => setIsMinimized(false);

  const buttonStyle = {
    width: '60px',
    height: '60px',
    background: `linear-gradient(135deg, ${config.primaryColor ?? '#374151'} 0%, ${
      config.primaryColor ?? '#4b5563'
    }dd 100%)`,
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
  } as const;

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className={`fixed ${positionClasses[position]} flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 active:scale-95 z-50`}
        style={buttonStyle}
        aria-label="Abrir chat"
      >
        <ChatIcon size={32} />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <button
        onClick={handleMaximize}
        className={`fixed ${positionClasses[position]} flex items-center justify-center transition-transform duration-300 ease-out hover:scale-110 active:scale-95 z-50`}
        style={buttonStyle}
        aria-label="Maximizar chat"
      >
        <ChatIcon size={32} />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} flex flex-col z-50`}
      style={{
        width: parseSize(width),
        height: parseSize(height),
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6', // gray-800 / gray-100 shadcn
        border: theme === 'dark' ? '1px solid #374151' : '1px solid #d1d5db', // gray-700 / gray-300
        boxShadow: 'none',
      }}
      role="dialog"
      aria-modal="true"
    >
      <header
        className="flex items-center justify-between px-5"
        style={{
          background: theme === 'dark' ? '#111827' : '#e5e7eb', // gray-900 / gray-200
          borderBottom: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db', // gray-600 / gray-300
          color: theme === 'dark' ? '#e0e7ff' : '#374151', // indigo-100 / gray-700
          minHeight: 56,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: config.primaryColor ?? (theme === 'dark' ? '#2563eb' : '#3b82f6'),
            }}
          />
          <span className="font-semibold text-sm tracking-tight">{config.title}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="p-2 rounded hover:bg-gray-700"
            style={{
              color: theme === 'dark' ? '#cbd5e1' : '#4b5563',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Minimizar"
          >
            <Minimize2 size={16} />
          </button>

          <button
            onClick={handleClose}
            className="p-2 rounded hover:bg-gray-700"
            style={{
              color: theme === 'dark' ? '#cbd5e1' : '#4b5563',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          title="Chat"
          className="w-full h-full border-0 block"
          style={{ backgroundColor: 'transparent', display: 'block' }}
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
        />
      </main>
    </div>
  );
}
