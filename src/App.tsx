import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { ChatPage } from './components/pages/chat/ChatPage'
import { AppBarComponent } from './components/partials/AppBarComponent'
import { HistoryPage } from './components/pages/history/HistoryPage'

function App() {
    return (
        <BrowserRouter>
            <AppBarComponent />

            <Switch>
                <Route path={`/history`} component={HistoryPage} />
                <Route path={`/chat`} component={ChatPage} />
                <Route path={`/`} render={props => <Redirect to={`/chat`} />} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
