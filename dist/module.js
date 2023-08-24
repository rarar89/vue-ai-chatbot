import {createPinia as $hgUW1$createPinia, defineStore as $hgUW1$defineStore} from "pinia";
import {ref as $hgUW1$ref, computed as $hgUW1$computed} from "vue";
import {fetchEventSource as $hgUW1$fetchEventSource} from "@microsoft/fetch-event-source";


const $6f744c426fe51193$export$800d9523a16c08b5 = (0, $hgUW1$defineStore)("chatbot", {
    state: ()=>({
            messages: [],
            history: [],
            isLoading: false,
            isError: false,
            error: null,
            pendingSourceDocs: [],
            pendingMessage: "",
            apiEndpoint: ""
        }),
    actions: {
        addMessage (message) {
            this.messages.push(message);
        },
        updateIncoming (payload) {
            if (payload.error) {
                this.error = payload.error;
                this.isError = true;
            }
            if (payload.pending) this.pendingMessage += payload.pending;
            if (payload.sourceDocs) this.pendingSourceDocs = payload.sourceDocs;
        },
        clearIncoming () {
            this.pendingMessage = "";
        },
        finishIncoming (message) {
            this.history.push([
                message.message,
                this.pendingMessage,
                this.pendingSourceDocs
            ]);
            this.messages.push({
                type: "bot",
                message: this.pendingMessage,
                sourceDocs: this.pendingSourceDocs
            });
            this.pendingMessage = "";
            this.pendingSourceDocs = [];
            this.isLoading = false;
        },
        setError (error) {
            this.isError = true;
            this.error = error;
        },
        clearError () {
            this.isError = false;
            this.error = null;
        },
        setLoading (isLoading) {
            this.isLoading = isLoading;
        },
        clearMessages () {
            this.messages = [];
        },
        setApiEndpoint (apiEndpoint) {
            this.apiEndpoint = apiEndpoint;
        }
    }
});



const $533bd68a31ad5d39$var$chatBotPlugin = {
    install: (app, options)=>{
        const pinia = (0, $hgUW1$createPinia)();
        const chatbotStore = (0, $6f744c426fe51193$export$800d9523a16c08b5)(pinia);
        app.provide("chatbot", chatbotStore);
        const store = (0, $6f744c426fe51193$export$800d9523a16c08b5)();
        store.$patch({
            apiEndpoint: options.endpoint
        });
    }
};
var $533bd68a31ad5d39$export$2e2bcd8739ae039 = $533bd68a31ad5d39$var$chatBotPlugin;





function $576fdbc7bc7d2cb1$export$2e2bcd8739ae039() {
    const chatbot = (0, $6f744c426fe51193$export$800d9523a16c08b5)();
    const sendMessage = async (question)=>{
        chatbot.clearError();
        chatbot.addMessage({
            message: question,
            type: "user"
        });
        const apiPath = chatbot.apiEndpoint + "/chat";
        try {
            (0, $hgUW1$fetchEventSource)(apiPath, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "mode": "cors"
                },
                body: JSON.stringify({
                    question: question,
                    history: chatbot.history
                }),
                onmessage: (event)=>{
                    if (event.data === "[DONE]") return;
                    const data = JSON.parse(event.data);
                    chatbot.updateIncoming(data);
                },
                onclose: ()=>{
                    chatbot.finishIncoming({
                        message: question,
                        type: "user"
                    });
                },
                onerror: (err)=>{
                    chatbot.setError(err.message);
                }
            });
        } catch (error) {
            chatbot.setError(error.message);
        }
    };
    const clearMessages = ()=>{
        chatbot.clearMessages();
    };
    const setEndpoint = (endpoint)=>{
        chatbot.setApiEndpoint(endpoint);
    };
    return {
        messages: (0, $hgUW1$ref)(chatbot.messages),
        isLoading: (0, $hgUW1$ref)(chatbot.isLoading),
        isError: (0, $hgUW1$ref)(chatbot.isError),
        error: (0, $hgUW1$ref)(chatbot.error),
        sendMessage: sendMessage,
        clearMessages: clearMessages,
        setEndpoint: setEndpoint
    };
}




function $66807a6bd0f0dc83$export$2e2bcd8739ae039() {
    const store = (0, $6f744c426fe51193$export$800d9523a16c08b5)();
    return {
        pending: (0, $hgUW1$computed)(()=>store.pendingMessage)
    };
}




export {$533bd68a31ad5d39$export$2e2bcd8739ae039 as chatBot, $576fdbc7bc7d2cb1$export$2e2bcd8739ae039 as useChatBot, $66807a6bd0f0dc83$export$2e2bcd8739ae039 as usePending};
//# sourceMappingURL=module.js.map
