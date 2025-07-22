import { useState } from 'preact/hooks';
import type { WidgetConfig } from '../utils/types';

interface WidgetProps {
  config: WidgetConfig;
}

export function Widget({ config }: WidgetProps) {
  // Teste básico com apenas um estado
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Configurações básicas
  const position = config.position || 'bottom-right';
  const title = config.title || 'Fale conosco';
  const primaryColor = config.primaryColor || '#3B82F6';

  console.log('Widget renderizando, isOpen:', isOpen);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  return (
    <div className="fixed z-50">
      {/* Botão flutuante */}
      <button
        onClick={() => {
          console.log('Botão clicado, isOpen atual:', isOpen);
          setIsOpen(!isOpen);
        }}
        className={`fixed ${positionClasses[position]} w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110`}
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Widget de chat simplificado */}
      {isOpen && (
        <div className={`fixed ${positionClasses[position]} w-80 h-96 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 flex flex-col`}>
          {/* Header */}
          <div
            className="p-4 rounded-t-lg text-white font-semibold"
            style={{ backgroundColor: primaryColor }}
          >
            {title}
          </div>

          {/* Conteúdo simples */}
          <div className="flex-1 p-4">
            <p>Widget funcionando! 🎉</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
              placeholder="Digite algo..."
              className="w-full p-3 border border-gray-300 rounded-lg mt-4"
            />
            <p className="mt-2 text-sm text-gray-600">
              Valor digitado: {inputValue}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 