import * as React from 'react'
import { FormEvent, useContext, useState } from 'react'
import { ChatContext } from '../../context/chatContext'
import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../../hooks/useUser'

const useStyles = makeStyles((theme) => ({
    panel: {
        bottom: 0,
        left: 10,
        right: 10,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
}));

export function ChatInputComponent() {
    const classes = useStyles()
    const user = useUser()
    const chat = useContext(ChatContext)
    const [message, setMessage] = useState('')

    const sendMessage = (e: FormEvent) => {
        e.preventDefault()

        chat.addMessage({
            id: +new Date(),
            user: user,
            text: message
        })

        setMessage('')
    }

    return (
        <form onSubmit={sendMessage}>
            <Box className={classes.panel} py={1} px={1}>
                <TextField
                    fullWidth
                    multiline
                    id="outlined-basic"
                    label="Message..."
                    inputProps={{ 'data-testid': 'chat-input' }}
                    variant="outlined"
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                />

                <Button type={'submit'} data-testid={'chat-send'} variant="contained" color="primary">
                    Send
                </Button>
            </Box>
        </form>
    )
}