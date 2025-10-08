// Exemplo de uso do widget com validação de URL
// Este arquivo demonstra como usar o widget com a nova funcionalidade simplificada

// Importar o widget (assumindo que está sendo usado via CDN ou bundler)
// import Leadnator from 'leadnator-widget';

// ✨ FORMA SIMPLIFICADA - Apenas flowId é necessário!
// Os endpoints da API são construídos automaticamente
const widgetConfig = {
  flowId: '68b4a0d9e64414a59012ca4c'
};

// OU se você quiser sobrescrever configurações do servidor:
const widgetConfigCustomizado = {
  flowId: '68b4a0d9e64414a59012ca4c',
  title: 'Chat de Suporte', // Sobrescreve o título do servidor
  position: 'bottom-right',  // Sobrescreve a posição do servidor
};

// Inicializar o widget
async function initChatWidget() {
  try {
    const widgetInstance = await Leadnator.initWidget(widgetConfig);
    
    if (widgetInstance) {
      console.log('Widget inicializado com sucesso!');
      console.log('Configuração:', widgetInstance.getConfig());
    } else {
      console.log('Widget não foi inicializado - URL atual não corresponde à configuração de domínio');
    }
  } catch (error) {
    console.error('Erro ao inicializar widget:', error);
  }
}

// Inicializar quando a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
  initChatWidget();
}

// Exemplo de como o widget se comporta:
// 1. Constrói automaticamente os endpoints:
//    - configEndpoint: https://api.leadnator.com.br/api/v1/flows/public/{flowId}/widget-design
//    - domainEndpoint: https://api.leadnator.com.br/api/v1/flows/domains/{flowId}
// 2. Se a URL atual for 'domain.com.br' e o status for 'active' -> Widget será renderizado
// 3. Se a URL atual for 'outro-site.com' -> Widget NÃO será renderizado
// 4. Se o status for 'inactive' -> Widget NÃO será renderizado
// 5. Se houver paths configurados, verifica se a URL atual corresponde a algum deles

// NOTA: Você ainda pode passar configEndpoint e domainEndpoint manualmente se precisar customizar:
const widgetConfigManual = {
  flowId: '68b4a0d9e64414a59012ca4c',
  configEndpoint: 'http://localhost:3333/api/v1/flows/public/68b4a0d9e64414a59012ca4c/widget-design',
  domainEndpoint: 'http://localhost:3333/api/v1/flows/domains/68b4a0d9e64414a59012ca4c'
};
