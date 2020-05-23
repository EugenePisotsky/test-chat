import { AppBar, Button, Toolbar } from '@material-ui/core'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/chat', title: 'Chat' },
    { to: '/history', title: 'History' },
]

export function AppBarComponent() {
    return (
        <AppBar position="static">
            <Toolbar>
                { links.map(({ to, title }) => (
                    <Button
                        color="inherit"
                        component={NavLink}
                        activeClassName={'MuiButton-outlined'}
                        to={to}
                        key={to}
                    >
                        {title}
                    </Button>
                )) }
            </Toolbar>
        </AppBar>
    )
}