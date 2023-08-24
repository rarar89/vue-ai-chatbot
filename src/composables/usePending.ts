import { computed } from 'vue';
import { useChatbotStore } from '../store/chatbotStore';

export default function usePending() {
  const store = useChatbotStore();
  
  return {
    pending: computed(() => store.pendingMessage)
  };
}