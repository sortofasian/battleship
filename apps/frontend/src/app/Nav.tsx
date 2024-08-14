import { Link } from "wouter"

import { User } from "../userContext"

function Nav({ user }: { user: User }) {
    return user !== undefined ? (
        <div className="flex flex-row-reverse p-2">
            <div className="flex gap-6">
                <div className="flex gap-2">
                    <div className="min-w-max my-auto truncate text-gray-600">
                        {user.name}
                    </div>
                    <img
                        src="profile.png"
                        alt="profile"
                        className="size-12 rounded-full"
                    />
                </div>
                <div className="w-24 text-center bg-red-400 hover:bg-red-500 duration-300 p-2 rounded-lg">
                    Logout
                </div>
            </div>
        </div>
    ) : (
        <div className="flex gap-2">
            <Link
                to="/login"
                className="w-full text-center bg-sky-300 hover:bg-sky-500 duration-300 p-2 rounded-lg"
            >
                Login
            </Link>
            <Link
                to="/register"
                className="w-full text-center bg-sky-400 hover:bg-sky-500 duration-300 p-2 rounded-lg"
            >
                Register
            </Link>
        </div>
    )
}

export default Nav
