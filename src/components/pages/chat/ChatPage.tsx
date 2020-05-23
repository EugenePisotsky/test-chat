import * as React from 'react'
import { useChat } from '../../../hooks/useChat'
import { ChatInputComponent } from '../../partials/ChatInputComponent'
import { Box } from '@material-ui/core'
import ChatMessageComponent from '../../partials/ChatMessageComponent'
import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)'
    },

    messages: {
        paddingTop: 15,
        overflow: 'auto',
        flex: 1
    }
}));

export function ChatPage(props: {}) {
    const classes = useStyles()
    const messages = useChat()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <Box className={classes.layout}>
            <Box className={classes.messages} data-testid={'messages-list'}>
                { messages.map(e => <ChatMessageComponent message={e} key={e.id} />) }

                <div ref={scrollRef} />
            </Box>

            <ChatInputComponent />
        </Box>
    )
}