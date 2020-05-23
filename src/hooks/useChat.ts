import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'

export interface ChatMessage {
    id: number;
    user: string;
    text: string;
}

export function useChat() {
    const chat = useContext(ChatContext)
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {
        chat.connect()
        setMessages(m => chat.getHistory(10))

        const cb = chat.onMessage((message) => {
            setMessages(m => [...m, message])
        })

        return () => {
            cb()
            chat.disconnect()
        }
    }, [chat])

    return messages
}