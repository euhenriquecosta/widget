import { MessageCircle, X } from 'lucide-react';
import type { WidgetConfig } from '../utils/types';
import { useWidgetTrigger } from '../utils/hooks';

interface WidgetProps {
  config: WidgetConfig;
}

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

  const themeClasses = {
    dark: {
      container: 'bg-gray-800 border-gray-700',
      header: 'bg-gray-900 border-gray-600 text-indigo-100',
      closeButton: 'text-gray-300 hover:bg-gray-700'
    },
    light: {
      container: 'bg-gray-100 border-gray-300',
      header: 'bg-gray-200 border-gray-300 text-gray-700',
      closeButton: 'text-gray-600 hover:bg-gray-300'
    },
    whatsapp: {
      container: 'bg-green-600 border-green-700',
      header: 'bg-green-700 border-green-800 text-white',
      closeButton: 'text-white hover:bg-green-600'
    },
    default: {
      container: 'bg-gray-800 border-gray-700',
      header: 'bg-gray-900 border-gray-600 text-indigo-100',
      closeButton: 'text-gray-300 hover:bg-gray-700'
    },
    custom: {
      container: 'bg-gray-800 border-gray-700',
      header: 'bg-gray-900 border-gray-600 text-indigo-100',
      closeButton: 'text-gray-300 hover:bg-gray-700'
    }
  };

  const currentTheme = themeClasses[theme] || themeClasses.dark;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${positionClasses[position]} bg-[${config.primaryColor}] flex items-center justify-center w-15 h-15 rounded-full transition-transform hover:scale-110 z-50 shadow-lg`}
        aria-label="Abrir chat"
      >
        <MessageCircle size={32} fill='white' className='h-8 w-8 text-white' />
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} flex flex-col z-50 rounded-xl overflow-hidden shadow-2xl`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      role="dialog"
      aria-modal="true"
    >
      <header
        className={`flex items-center justify-between px-5 py-4 border-b min-h-14 ${currentTheme.header}`}
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
          className={`p-2 rounded-lg transition-colors ${currentTheme.closeButton}`}
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </header>

      <main className="flex-1 overflow-hidden">
        <iframe
          src={iframeUrl}
          title="Chat"
          className="w-full h-full border-0 bg-transparent"
          allow="microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </main>
    </div>
  );
}
