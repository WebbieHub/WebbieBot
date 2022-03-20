import axios from 'axios'

export async function getUser(id: string) {
    return await axios.get(`http://localhost:8080/api/user/${id}`)
}