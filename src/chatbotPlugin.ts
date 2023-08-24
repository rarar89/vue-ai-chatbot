import { App } from 'vue';
import { useChatbotStore } from './store/chatbotStore';
import { createPinia } from 'pinia';

const chatBotPlugin = {
  install: (app: App, options: { endpoint: string }) => {

    const pinia = createPinia()

    const chatbotStore = useChatbotStore(pinia)

    app.provide('chatbot', chatbotStore)

    const store = useChatbotStore();
    store.$patch({ apiEndpoint: options.endpoint });
  }
};

export default chatBotPlugin;