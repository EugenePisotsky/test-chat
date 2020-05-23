import { ChatMessage } from '../hooks/useChat'
import { HISTORY_STORAGE_KEY } from '../config/constants'
import { BaseChatAdapter, ChatAdapter } from './ChatAdapter'

export class WsChatAdapter extends BaseChatAdapter implements ChatAdapter {

    private sock?: WebSocket

    constructor(private url: string) {
        super();
    }

    connect(): void {
        this.sock = new WebSocket(this.url)
        this.sock.onmessage = (message: MessageEvent) => {
            this.emit(JSON.parse(message.data))
        }
    }

    disconnect(): void {
        this.sock?.close()
    }

    getHistory(limit?: number | null): ChatMessage[] {
        const history = localStorage.getItem(HISTORY_STORAGE_KEY)

        if (!history) {
            return []
        }

        try {
            const messages = JSON.parse(history)
            return limit ? messages.slice(Math.max(0, messages.length - limit!)) : messages
        } catch (e) {
            return []
        }
    }

    addMessage(message: ChatMessage): void {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([...this.getHistory(), message]))

        this.sock?.send(JSON.stringify(message))
    }

    removeMessageFromHistory(id: number) {
        const history = this.getHistory()
        const updatedMessages = history.filter(item => item.id !== id)
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedMessages))

        return updatedMessages
    }

}