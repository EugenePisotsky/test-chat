import { BaseChatAdapter, ChatAdapter } from './ChatAdapter'
import { ChatMessage } from '../hooks/useChat'

export class MemoryChatAdapter extends BaseChatAdapter implements ChatAdapter {
    messages: ChatMessage[] = []

    getHistory(limit?: number | null): ChatMessage[] {
        return this.messages
    }

    addMessage(message: ChatMessage): void {
        this.emit(message)
        this.messages.push(message)
    }

    removeMessageFromHistory(id: number) {
        this.messages = this.messages.filter(msg => msg.id !== id)

        return this.messages
    }
}