var $8zHUo$pinia = require("pinia");
var $8zHUo$vue = require("vue");
var $8zHUo$microsoftfetcheventsource = require("@microsoft/fetch-event-source");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "chatBot", () => $84a77d389294ac59$export$2e2bcd8739ae039);
$parcel$export(module.exports, "useChatBot", () => $554202ceb5bca763$export$2e2bcd8739ae039);
$parcel$export(module.exports, "usePending", () => $f17b3203e08900a9$export$2e2bcd8739ae039);

const $75959ddf8df0864a$export$800d9523a16c08b5 = (0, $8zHUo$pinia.defineStore)("chatbot", {
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



const $84a77d389294ac59$var$chatBotPlugin = {
    install: (app, options)=>{
        const pinia = (0, $8zHUo$pinia.createPinia)();
        const chatbotStore = (0, $75959ddf8df0864a$export$800d9523a16c08b5)(pinia);
        app.provide("chatbot", chatbotStore);
        const store = (0, $75959ddf8df0864a$export$800d9523a16c08b5)();
        store.$patch({
            apiEndpoint: options.endpoint
        });
    }
};
var $84a77d389294ac59$export$2e2bcd8739ae039 = $84a77d389294ac59$var$chatBotPlugin;





function $554202ceb5bca763$export$2e2bcd8739ae039() {
    const chatbot = (0, $75959ddf8df0864a$export$800d9523a16c08b5)();
    const sendMessage = async (question)=>{
        chatbot.clearError();
        chatbot.addMessage({
            message: question,
            type: "user"
        });
        const apiPath = chatbot.apiEndpoint + "/chat";
        try {
            (0, $8zHUo$microsoftfetcheventsource.fetchEventSource)(apiPath, {
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
        messages: (0, $8zHUo$vue.ref)(chatbot.messages),
        isLoading: (0, $8zHUo$vue.ref)(chatbot.isLoading),
        isError: (0, $8zHUo$vue.ref)(chatbot.isError),
        error: (0, $8zHUo$vue.ref)(chatbot.error),
        sendMessage: sendMessage,
        clearMessages: clearMessages,
        setEndpoint: setEndpoint
    };
}




function $f17b3203e08900a9$export$2e2bcd8739ae039() {
    const store = (0, $75959ddf8df0864a$export$800d9523a16c08b5)();
    return {
        pending: (0, $8zHUo$vue.computed)(()=>store.pendingMessage)
    };
}




//# sourceMappingURL=main.js.map
