import { useChatbotStore } from '../store/chatbotStore'; // Import the Pinia store
import { ref } from 'vue';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export default function useChatBot() {
  const chatbot = useChatbotStore();
  const sendMessage = async (question: string) => {
    chatbot.clearError();
    chatbot.addMessage({
      message: question,
      type: 'user',
    });

    const apiPath = chatbot.apiEndpoint + '/chat';
    try {
      fetchEventSource(apiPath, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'cors',
        },
        body: JSON.stringify({
          question,
          history: chatbot.history,
        }),
        onmessage: (event: any) => {
          if (event.data === '[DONE]') {
            return;
          }
          const data = JSON.parse(event.data);
          chatbot.updateIncoming(data);
        },
        onclose: () => {
          chatbot.finishIncoming({ message: question, type: 'user' });
        },
        onerror: (err: any) => {
          chatbot.setError(err.message);
        },
      });
    } catch (error: any) {
      chatbot.setError(error.message);
    }
  };

  const clearMessages = () => {
    chatbot.clearMessages();
  };

  const setEndpoint = (endpoint: string) => {
    chatbot.setApiEndpoint(endpoint);
  };

  return {
    messages: ref(chatbot.messages), 
    isLoading: ref(chatbot.isLoading),
    isError: ref(chatbot.isError),
    error: ref(chatbot.error),
    sendMessage,
    clearMessages,
    setEndpoint,
  };
}
