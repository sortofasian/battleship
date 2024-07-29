import { useState } from "react"
import { Redirect, Route, Switch } from "wouter"

import { User, UserContext } from "../userContext"
import Dashboard from "./Dashboard"
import Nav from "./Nav"

export function App() {
    const [user, setUser] = useState<User>({
        id: "",
        name: "Test User",
        token: ""
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div className="flex flex-col h-screen">
                <Nav user={user} />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="*">
                        <Redirect to="/dashboard" />
                    </Route>
                </Switch>
            </div>
        </UserContext.Provider>
    )
}
