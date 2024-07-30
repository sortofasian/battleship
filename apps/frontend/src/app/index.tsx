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
                {user === undefined ? (
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route>
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                ) : (
                    <>
                        <Nav user={user} />
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="*">
                                <Redirect to="/dashboard" />
                            </Route>
                        </Switch>
                    </>
                )}
            </div>
        </UserContext.Provider>
    )
}
