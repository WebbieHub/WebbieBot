import axios from 'axios'

export async function getUser(id: string) {
    return await axios.get(`/api/user/${id}`)
}