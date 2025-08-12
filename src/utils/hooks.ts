import { useState, useEffect, useCallback } from 'preact/hooks';

// Tipos para melhor type safety
type TriggerType = 'button' | 'immediate' | 'delayed' | 'scroll' | 'exit-intent';

interface TriggerConfig {
  trigger: TriggerType;
  autoOpenDelay?: number;
  scrollThreshold?: number;
}

interface TriggerState {
  isOpen: boolean;
  hasAutoOpened: boolean;
  wasManuallyClosed: boolean;
}

// Hook principal que gerencia o comportamento de abertura
export const useWidgetTrigger = (config: TriggerConfig) => {
  const [state, setState] = useState<TriggerState>({
    isOpen: false,
    hasAutoOpened: false,
    wasManuallyClosed: false
  });

  const { trigger, autoOpenDelay = 3000, scrollThreshold = 50 } = config;

  // Função para atualizar estado de forma imutável
  const updateState = useCallback((updates: Partial<TriggerState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Função para abrir o widget
  const openWidget = useCallback(() => {
    updateState({ 
      isOpen: true, 
      wasManuallyClosed: false 
    });
  }, [updateState]);

  // Função para fechar o widget
  const closeWidget = useCallback(() => {
    updateState({ 
      isOpen: false, 
      wasManuallyClosed: true 
    });
  }, [updateState]);

  // Função para alternar o estado (apenas para trigger 'button')
  const toggleWidget = useCallback(() => {
      if (!state.isOpen) {
        openWidget();
      } else {
        closeWidget();
      }
  }, [trigger, state.isOpen, openWidget, closeWidget]);

  // Effect para gerenciar triggers automáticos
  useEffect(() => {
    // Se já foi aberto automaticamente ou fechado manualmente, não faz nada
    if (state.hasAutoOpened || state.wasManuallyClosed) {
      return;
    }

    // Abertura imediata
    if (trigger === 'immediate') {
      updateState({ isOpen: true, hasAutoOpened: true });
      return;
    }

    // Abertura com delay
    if (trigger === 'delayed') {
      const timer = setTimeout(() => {
        if (!state.hasAutoOpened && !state.wasManuallyClosed) {
          updateState({ isOpen: true, hasAutoOpened: true });
        }
      }, autoOpenDelay);
      
      return () => clearTimeout(timer);
    }

    // Abertura por scroll
    if (trigger === 'scroll') {
      const handleScroll = () => {
        if (state.hasAutoOpened || state.wasManuallyClosed) return;
        
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= scrollThreshold) {
          updateState({ isOpen: true, hasAutoOpened: true });
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Abertura por exit intent
    if (trigger === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (state.hasAutoOpened || state.wasManuallyClosed) return;
        
        if (e.clientY <= 0) {
          updateState({ isOpen: true, hasAutoOpened: true });
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [trigger, state.hasAutoOpened, state.wasManuallyClosed, updateState, autoOpenDelay, scrollThreshold]);

  return {
    isOpen: state.isOpen,
    handleClose: closeWidget,
    handleToggle: toggleWidget
  };
};
