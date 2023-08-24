import { App } from "vue";
export const chatBot: {
    install: (app: App, options: {
        endpoint: string;
    }) => void;
};
export function useChatBot(): {
    messages: import("vue").Ref<{
        type: "user" | "bot";
        message: string;
        isStreaming?: boolean;
        sourceDocs?: {
            pageContent: string;
            metadata: Record<string, any>;
        }[];
    }[]>;
    isLoading: import("vue").Ref<boolean>;
    isError: import("vue").Ref<boolean>;
    error: import("vue").Ref<string>;
    sendMessage: (question: string) => Promise<void>;
    clearMessages: () => void;
    setEndpoint: (endpoint: string) => void;
};
export function usePending(): {
    pending: import("vue").ComputedRef<string>;
};

//# sourceMappingURL=index.d.ts.map
