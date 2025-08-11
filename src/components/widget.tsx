import { X } from 'lucide-react';
import type { WidgetConfig } from '../utils/types';
import { useWidgetTrigger } from '../utils/hooks';

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
  const position = config.position ?? 'bottom-right';
  const theme = config.theme ?? 'dark';
  const width = config.width ?? 384;
  const height = config.height ?? 600;

  const trigger = config.trigger ?? (config.autoOpen ? 'immediate' : 'button');
  const { isOpen, setIsOpen } = useWidgetTrigger({
    trigger,
    autoOpenDelay: config.autoOpenDelay,
    scrollThreshold: config.scrollThreshold
  });

  const flowId = '68963b901d3edd1d9dfb13cd';
  const iframeUrl = `http://localhost:3000/widgets?theme=${theme}&flowId=${flowId}`;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    background: config.primaryColor ?? '#374151',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} flex items-center justify-center transition-transform hover:scale-110 z-50`}
        style={buttonStyle}
        aria-label="Abrir chat"
      >
        <ChatIcon size={32} />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} flex flex-col z-50`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6',
        border: theme === 'dark' ? '1px solid #374151' : '1px solid #d1d5db',
      }}
      role="dialog"
      aria-modal="true"
    >
      <header
        className="flex items-center justify-between px-5"
        style={{
          background: theme === 'dark' ? '#111827' : '#e5e7eb',
          borderBottom: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
          color: theme === 'dark' ? '#e0e7ff' : '#374151',
          minHeight: 56,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: config.primaryColor ?? '#2563eb' }}
          />
          <span className="font-semibold text-sm">{config.title}</span>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded !px-0 !mx-0 hover:bg-gray-700"
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
      </header>

      <main className="flex-1 overflow-hidden">
        <iframe
          src={iframeUrl}
          title="Chat"
          className="w-full h-full border-0"
          style={{ backgroundColor: 'transparent' }}
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </main>
    </div>
  );
}
