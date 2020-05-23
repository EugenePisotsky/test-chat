import { render } from '@testing-library/react'
import { ChatContext } from '../../../../context/chatContext'
import { MemoryChatAdapter } from '../../../../adapters/MemoryChatAdapter'
import * as React from 'react'
import { HistoryPage } from '../../../../components/pages/history/HistoryPage'

describe('HistoryPage', () => {

    it('should display history', async () => {
        const historyLen = 2
        const history = new Array(historyLen)
            .fill(null)
            .map((item, index) => ({
                id: index,
                user: 'test',
                text: `chat message ${index}`
            }))

        MemoryChatAdapter.prototype.getHistory = function(limit: number | null) {
            return history
        }

        const adapter = new MemoryChatAdapter()

        const { getAllByText } = render(
            <ChatContext.Provider value={adapter}>
                <HistoryPage />
            </ChatContext.Provider>
        )

        expect(getAllByText(/chat message [0-9]+/i).length).toBe(historyLen)
    })

})