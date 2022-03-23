import axios from 'axios'

export async function getUser(tag: string) {
    return await axios.post("/api/user/stats", {tag})
}

export async function getAllUsers() {
    return await axios.get("/api/user")
}