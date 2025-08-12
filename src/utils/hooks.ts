import { useState, useEffect } from 'preact/hooks';

// Hook principal que gerencia o comportamento de abertura
export const useWidgetTrigger = (config: {
  trigger: 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger } = config;

  // Valores padrão fixos
  const autoOpenDelay = 3000; // 3 segundos
  const scrollThreshold = 50; // 50% da página

  useEffect(() => {
    // Abertura imediata - abre automaticamente
    if (trigger === 'immediate') {
      setIsOpen(true);
      return;
    }

    // Abertura com delay - abre após tempo definido
    if (trigger === 'delayed') {
      const timer = setTimeout(() => setIsOpen(true), autoOpenDelay);
      return () => clearTimeout(timer);
    }

    // Abertura por scroll - abre ao rolar % da página
    if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= scrollThreshold) {
          setIsOpen(true);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Abertura por exit intent - abre quando mouse sai da janela
    if (trigger === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsOpen(true);
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }

    // trigger === 'button' - não abre automaticamente, aguarda clique
    // O botão sempre aparece, mas só abre quando clicado
  }, [trigger]);

  return { isOpen, setIsOpen };
};
