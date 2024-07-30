import { useContext } from "react"
import { useLocation } from "wouter"

import { User, UserContext } from "../../userContext"

function Nav({ user }: { user: User }) {
    const { user: userCtx, setUser: setUserCtx } = useContext(UserContext)
    const [, nav] = useLocation()

    function logout() {
        // clear the userContext on logout
        nav("/")
    }

    return (
        <div className="flex flex-row-reverse p-2">
            <div className="flex gap-6">
                <div className="flex gap-2">
                    <div className="min-w-max my-auto truncate text-gray-600">
                        {/* Username should go here */}
                    </div>
                    <img
                        src="profile.png"
                        alt="profile"
                        className="size-12 rounded-full"
                    />
                </div>
                <div
                    className="w-24 text-center bg-red-400 hover:bg-red-500 duration-300 p-2 rounded-lg" /* run logout function on click*/
                >
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Nav
