import { WsChatAdapter } from '../../adapters/WsChatAdapter'
import { Server } from 'mock-socket'
import { ChatMessage } from '../../hooks/useChat'

const url = `ws://localhost:8080`

describe('WsChatAdapter', () => {
    it('should test ws adapter', async () => {
        const messagesNumber = 15
        const mockServer = new Server(url)

        const messagesToAdd: ChatMessage[] = new Array(messagesNumber)
            .fill(null)
            .map((item, index) => ({
                id: index,
                user: 'test',
                text: `test message ${index}`
            }))

        mockServer.on('connection', socket => {
            socket.on('message', socket.send);
        })

        const adapter = new WsChatAdapter(url)
        adapter.connect()

        // track that message is emitted
        const emitEvents = jest.spyOn(adapter, 'emit')

        for (const msg of messagesToAdd) {
            adapter.addMessage(msg)
        }

        await new Promise((resolve, reject) => {
            setTimeout(() => {
                expect(emitEvents).toHaveBeenCalledTimes(messagesNumber)

                // check that history is limited correctly
                const limit = 5
                const history = adapter.getHistory(limit)
                expect(history.length).toBe(limit)
                expect(history[0].id).toBe(messagesNumber - limit)

                // check if messages are removed correctly
                expect(adapter.getHistory()[1].id).toBe(1)
                adapter.removeMessageFromHistory(1)
                expect(adapter.getHistory()[1].id).toBe(2)

                adapter.disconnect()
                mockServer.close()

                resolve()
            }, 100)
        })
    })
})