import { createContext, Dispatch, SetStateAction } from "react"

export type User =
    | {
          token: string
          name: string
          id: string
      }
    | undefined

interface ContextType {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<ContextType>({
    user: undefined,
    setUser: (_action: SetStateAction<User>) => undefined
})
