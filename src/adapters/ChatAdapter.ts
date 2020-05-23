import { ChatMessage } from '../hooks/useChat'

export type OnMessageCallback = (message: ChatMessage) => void

export interface ChatAdapter {
    connect(): void
    disconnect(): void
    getHistory(limit?: number | null): ChatMessage[]
    addMessage(message: ChatMessage): void
    onMessage(callback: OnMessageCallback): () => void
    removeMessageFromHistory(id: number): ChatMessage[]
}

export abstract class BaseChatAdapter {

    protected onMessageCallbacks: OnMessageCallback[] = []

    connect(): void {}
    disconnect(): void {}

    onMessage(callback: OnMessageCallback) {
        this.onMessageCallbacks.push(callback)

        return () => this.onMessageCallbacks.filter(cb => cb !== callback)
    }

    emit(message: ChatMessage) {
        this.onMessageCallbacks.forEach(cb => cb(message))
    }

}