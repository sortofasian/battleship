import { UserResponseDto } from "@hs-intern/api"
import { useContext, useRef, useState } from "react"

import useApi from "../useApi"
import { UserContext } from "../userContext"

function useDelay(f: (x: string) => void) {
    const timeout = useRef<number | undefined>(undefined)
    return (x: string) => {
        clearTimeout(timeout.current)
        timeout.current = setTimeout(f, 500, x)
    }
}

export default function NewGame() {
    const [selectedUser, setSelectedUser] = useState<
        UserResponseDto | undefined
    >()
    const [userList, setUsers] = useState<UserResponseDto[]>([])
    const { user } = useContext(UserContext)
    const api = useApi(user?.token)

    const search = useDelay(async function (search) {
        // Search API for users, set userList to result
    })

    return (
        <div className="p-6 m-auto w-80">
            <h3 className="font-bold text-3xl mb-2">New Game</h3>
            <input
                onInput={async (e) => {
                    const query = e.currentTarget.value.trim()
                    search(query)
                }}
                className="p-2 w-64 rounded-md"
                placeholder="Enemy"
            />
            <ul className="my-4 p-2 w-64 border border-black border-opacity-20 rounded-md">
                <h5 className="font-bold text-xl mb-2">Users</h5>
                <hr className="border-black border-opacity-20"></hr>
                {userList.map((v, i) => (
                    <li
                        key={i}
                        className="my-2 border border-black border-opacity-10 rounded-md hover:shadow-md overflow-hidden whitespace-nowrap"
                    >
                        <div
                            onClick={() => setSelectedUser(v)}
                            className={`inline-block w-full p-2 transition ${selectedUser === undefined ? "" : "-translate-x-full"}`}
                        >
                            {v.username}
                        </div>
                        <div
                            className={`inline-block w-full transition ${selectedUser === undefined ? "" : "-translate-x-full"}`}
                        >
                            <div className="flex">
                                <div
                                    className="bg-gray-300 p-2 w-10 text-center"
                                    onClick={() => setSelectedUser(undefined)}
                                >
                                    X
                                </div>
                                <div className="flex-grow bg-green-300 p-2">
                                    Start?
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
