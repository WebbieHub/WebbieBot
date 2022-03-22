import { Box, UnorderedList, ListItem, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import UserTable from "../components/UserTable";

export default function Admin() {
  const [auth, setAuth] = useState(false)
  const [users, setUsers] = useState<any>([{userId: "123"}])
  const [token, setToken] = useState("")
  const [selected, setSelected] = useState<any>(null)

  const tryAuth = () => {
    axios.post('/api/auth', { token })
      .then(res => {
        setAuth(res.data && res.data.auth)
      })
  }

  useEffect(() => {
    axios.get('/api/user').then(res => {
      console.log(res)
      if (res.data && res.data.users) {
        console.log(res.data.users.length)
        setUsers(res.data.users);
      }
    })
  }, [])

  useEffect(() => {
    console.log('reloaded', users)
  }, [users])

  return (
    <Box>
      {auth ? <Box>
        <h2>Users: {users.length}</h2>
        <UnorderedList>
          {users.map((user: any) =>
            <ListItem key={user.userId}>{user.tag} <Button onClick={() => setSelected(user)}>Select</Button></ListItem>
          )}
        </UnorderedList>
        {!!selected && <UserTable tag={selected.tag} userId={selected.userId} xp={selected.xp} level={selected.level} streak={selected.streak} />}
      </Box> : 
      <Box>
        <h2>Enter Admin Token:</h2>
        <Input placeholder="token" value={token} onChange={(e) => setToken(e.target.value)}></Input>
        <Button onClick={tryAuth}>Submit</Button>
      </Box>}
    </Box>
  )
}
