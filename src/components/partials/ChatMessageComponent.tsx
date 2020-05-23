import * as React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { ChatMessage } from '../../hooks/useChat'
import { useUser } from '../../hooks/useUser'
import { useContext, useState } from 'react'
import { ChatContext } from '../../context/chatContext'

function ChatMessageComponent({ message }: { message: ChatMessage }) {
    const [removed, setRemoved] = useState()
    const chat = useContext(ChatContext)
    const user = useUser()

    const removeMessage = () => {
        setRemoved(true)
        chat.removeMessageFromHistory(message.id)
    }

    return (
        <Box px={2} mb={1}>
            { removed ? (
                <Alert severity="info">Message has been removed!</Alert>
            ) : (
                <Card>
                    <CardHeader
                        action={
                            user === message.user ? (
                                <Button onClick={removeMessage}>Remove</Button>
                            ) : null
                        }
                        subheader={message.user}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textPrimary" component="p">
                            { message.text }
                        </Typography>
                    </CardContent>
                </Card>
            ) }
        </Box>
    )
}

export default React.memo(ChatMessageComponent)