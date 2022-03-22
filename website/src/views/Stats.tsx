import { Box, Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, Button } from "@chakra-ui/react";
import { useState } from "react";
import { getUser } from '../actions/actions'
import UserTable from "../components/UserTable";

export default function Stats() {
  const [userId, setUserId] = useState("");
  const [tag, setTag] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [streak, setStreak] = useState(0);

  const updateUser = () => {
    if (userId) {
      getUser(userId)
        .then(res => {
            if (res.data && res.data.user) {
                setXp(res.data.user.xp)
                setLevel(res.data.user.level)
                setStreak(res.data.user.streak)
                setTag(res.data.user.tag)
            }
        })
    }
  }

  return (
    <Box w="container.lg">
        <Input placeholder="User Id" w="auto" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Button onClick={updateUser}>Load Stats</Button>
        <UserTable userId={userId} tag={tag} xp={xp} level={level} streak={streak} />
    </Box>
  )
}
