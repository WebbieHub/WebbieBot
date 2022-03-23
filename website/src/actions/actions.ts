import axios from 'axios'

export async function getUser(tag: string) {
    return await axios.post("/api/user/stats", {tag})
}