import * as React from 'react'
import { fireEvent, getByText as getByTextIn, render } from '@testing-library/react'
import { ChatPage } from '../../../../components/pages/chat/ChatPage'
import { ChatContext } from '../../../../context/chatContext'
import { MemoryChatAdapter } from '../../../../adapters/MemoryChatAdapter'

Element.prototype.scrollIntoView = jest.fn()

describe('ChatPage', () => {

    it('should add and display the message', async () => {
        const { getByTestId } = render(
            <ChatContext.Provider value={new MemoryChatAdapter()}>
                <ChatPage />
            </ChatContext.Provider>
        )

        const message = 'test message'

        const input = getByTestId('chat-input')!
        fireEvent.change(input, { target: { value: message } })
        fireEvent.click(getByTestId('chat-send')!)

        const receivedMessage = await getByTextIn(getByTestId('messages-list'), message)
        expect(receivedMessage).toBeInTheDocument()
    })

})