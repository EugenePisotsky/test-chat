import * as React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'
import ChatMessageComponent from '../../partials/ChatMessageComponent'
import { Box } from '@material-ui/core'

export function HistoryPage(props: {}) {
    const chat = useContext(ChatContext)

    return (
        <Box py={2}>
            { chat.getHistory().map(e => <ChatMessageComponent message={e} key={e.id} />) }
        </Box>
    )
}