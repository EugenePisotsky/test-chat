import * as React from 'react'
import ChatMessageComponent from '../../../components/partials/ChatMessageComponent'
import { render, fireEvent } from '@testing-library/react'
import { ChatMessage } from '../../../hooks/useChat'
import { useUser } from '../../../hooks/useUser'

describe('ChatMessageComponent', () => {
    it('should render and remove the message', async () => {
        const user = useUser()

        const testMessage: ChatMessage = {
            id: 1,
            user,
            text: 'my message'
        }

        const { getByText, queryByText } = render(<ChatMessageComponent message={testMessage} />)

        expect(getByText(testMessage.user)).toBeInTheDocument()
        expect(getByText(testMessage.text)).toBeInTheDocument()

        fireEvent.click(getByText(/remove/i))
        expect(queryByText(testMessage.text)).toBeFalsy()
        expect(getByText(/message has been removed/i)).toBeInTheDocument()
    })

    it('should hide remove button', async () => {
        const testMessage: ChatMessage = {
            id: 1,
            user: 'test',
            text: 'my message'
        }

        const { queryByText } = render(<ChatMessageComponent message={testMessage} />)

        expect(queryByText(/remove/i)).toBeFalsy()
    })
})