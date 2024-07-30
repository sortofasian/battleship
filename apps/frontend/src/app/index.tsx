import { useState } from "react"
import { Redirect, Route, Switch } from "wouter"

import { User, UserContext } from "../userContext"
import Nav from "./components/Nav"
import Login from "./Login"
import Dashboard from "./Dashboard"
import { Setup } from "./Setup"

export function App() {
    const [user, setUser] = useState<User>()

    return (
        // If user is undefined, show the Login switch. Otherwise, show Nav and the switch with Dashboard
        <UserContext.Provider value={{ user, setUser }}>
            <div className="flex flex-col h-screen">
                <Nav user={user} />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/setup/:id">
                        {({ id }: { id: string }) => <Setup id={id} />}
                    </Route>
                    <Route path="*">
                        <Redirect to="/dashboard" />
                    </Route>
                </Switch>
                {/*
                the JSX below is what should be shown if no user is logged in
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route>
                        <Redirect to="/login" />
                    </Route>
                </Switch>
                */}
            </div>
        </UserContext.Provider>
    )
}
