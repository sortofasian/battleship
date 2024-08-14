import {
    LoginClaimDto,
    LoginRequestDto,
    LoginResponseDto,
    UserResponseDto
} from "@hs-intern/api"
import { decodeJwt } from "jose"
import { FormEvent, useContext, useState } from "react"
import { useLocation } from "wouter"

import useApi from "../useApi"
import { UserContext } from "../userContext"

export default function () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [, nav] = useLocation()
    const { user, setUser } = useContext(UserContext)
    const api = useApi(user?.token)

    async function submit(e: FormEvent) {
        e.preventDefault()

        // POST a LoginRequestDto to auth/login on the api, it should return a LoginResponseDto
        // Decode the JWT token to get the user ID
        // GET the rest of the user data from the api as users/{id}; this needs the header "Authorization" containing the string `Bearer ${token}`
        // Finally, set the userContext to the new user data

        nav("/dashboard")
    }

    return (
        <form className={style.form} onSubmit={submit}>
            <h1 className="text-xl font-bold">Login</h1>
            <input
                type="text"
                placeholder="Username"
                className={style.textInput}
                // the value should equal the username variable
                // set the username on input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
                
            />
            <input
                type="password"
                placeholder="Password"
                className={style.textInput}
                // Same deal as the username field
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Submit" className={style.submit} />
        </form>
    )
}

const style = {
    form: "p-8 flex flex-col items-center gap-4",
    textInput: "border-2 mx-2 rounded w-60 p-0.5",
    submit: "p-1 px-4 bg-blue-300 rounded-md font-semibold"
}
