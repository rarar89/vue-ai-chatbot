import { defineStore } from 'pinia';
import { IChatbotState, Document, Message } from '../types';

export const useChatbotStore = defineStore('chatbot', {
  state: (): IChatbotState => ({
    messages: [],
    history: [],
    isLoading: false,
    isError: false,
    error: null,
    pendingSourceDocs: [],
    pendingMessage: '',
    apiEndpoint: '',
  }),

  actions: {
    addMessage(message: Message) {
      this.messages.push(message);
    },

    updateIncoming(payload: { error?: string; pending?: string; sourceDocs?: Document[] }) {
      if (payload.error) {
        this.error = payload.error;
        this.isError = true;
      }

      if (payload.pending) {
        this.pendingMessage += payload.pending;
      }

      if (payload.sourceDocs) {
        this.pendingSourceDocs = payload.sourceDocs;
      }
    },

    clearIncoming() {
      this.pendingMessage = '';
    },

    finishIncoming(message: Message) {
      this.history.push([
        message.message,
        this.pendingMessage,
        this.pendingSourceDocs as Document[]
      ]);

      this.messages.push({
        type: 'bot',
        message: this.pendingMessage,
        sourceDocs: this.pendingSourceDocs,
      });

      this.pendingMessage = '';
      this.pendingSourceDocs = [];
      this.isLoading = false;
    },

    setError(error: string) {
      this.isError = true;
      this.error = error;
    },

    clearError() {
      this.isError = false;
      this.error = null;
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    clearMessages() {
      this.messages = [];
    },

    setApiEndpoint(apiEndpoint: string) {
      this.apiEndpoint = apiEndpoint;
    },
  }
});