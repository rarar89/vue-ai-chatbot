# Vue AI ChatBot

Simple Vue AI Chatbot based on GPT-3 or GPT-4 OpenAI models to chat with your data. This component provides composables for chatbot interaction - sending and receiving messages. UI Styling is completely up to you!

[Chatlas.ai](https://chatlas.ai) is used to set discussion context and settings!

**It's recommended to have your own Open AI Api Key to use React AI ChatBot! You can get your key [here](https://platform.openai.com/account/api-keys).**

## Install

``npm install vue-ai-chatbot``

or

``yarn add vue-ai-chatbot``

## Usage instructions: 

0. Register or login at OpenAI platform and set your [API Key here](https://platform.openai.com/account/api-keys).

1. Singup at [chatlas.ai](https://chatlas.ai) and add your OpenAI Key.

2. Start discussion either from documents or webpages. 

3. Enable discussion sharing (at right top side). Copy discussion endpoint.

4. Example implementation (update <your_discussion_endpoint> accordingly):

main.ts
```vuets

import { createApp } from 'vue'
import App from './ChatComponent.vue'
import { chatBot } from 'vue-ai-chatbot';

const app = createApp(App)
app.use(router).use(chatBot, {endpoint: '<your_discussion_endpoint>'})
app.mount('#app')

```

ChatComponent.vue
```vuets
<script setup lang="ts">
import { ref } from 'vue';
import { useChatBot, usePending } from 'vue-ai-chatbot';

const { sendMessage, messages } = useChatBot(); 
const { pending } = usePending();
const chatMessages = messages;
const userInput = ref<string>('');

function sendMessageHandler():void {
  sendMessage(userInput.value);
  userInput.value = '';
}
</script>
<template>
  <div>
    <h1>Chatbot</h1>
    <div v-for="(message, index) in chatMessages" :key="index">
      {{ message.type }}: {{ message.message }}
    </div>
    <div v-show="!!pending">bot: {{ pending }}</div>
    <input type="text" v-model="userInput" />
    <button @click="sendMessageHandler">Send</button>
  </div>
</template>
```

## Documentation

**useChatBot**
  - messages: <[{type: 'bot' | 'user', message: string}]> - Discussion messages are stored in this array
  - sendMessage: <(message: string)> - function used to send message
  - isLoading: boolean - true while ai generates the message
  - isError: boolean - when error occurs 
  - error: string - error message
  - clearMessages() - clear all chat messages
  - setEndpoint(endpoint:string) - set chat endpoint. Can be used to switch to a different chat

**usePending**
  - pending: string - use to get message on-the-fly while it's being generated, chatgpt style.
