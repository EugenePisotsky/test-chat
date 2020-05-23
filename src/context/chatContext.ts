import { createContext } from 'react'
import { WsChatAdapter } from '../adapters/WsChatAdapter'
import { ChatAdapter } from '../adapters/ChatAdapter'

export const ChatContext = createContext<ChatAdapter>(new WsChatAdapter(`ws://echo.websocket.org`))
