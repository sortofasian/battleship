import axios from "axios"

export default function useApi(token?: string) {
    const headers = {}
    if (token) Object.assign(headers, { Authorization: `Bearer ${token}` })

    return axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
