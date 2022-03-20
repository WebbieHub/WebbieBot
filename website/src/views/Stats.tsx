import { Box, Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUser } from '../actions/actions'

export default function Stats() {
  const [userId, setUserId] = useState("");
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
            }
        })
    }
  }

  return (
    <Box>
        <Input placeholder="User Id" w="auto" value={userId} onBlur={updateUser} onChange={(e) => setUserId(e.target.value)} />
        <Table variant="simple">
            <TableCaption>Some Caption - connected</TableCaption>
            <Thead>
                <Tr>
                    <Th>Property</Th>
                    <Th>Value</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>xp:</Td>
                    <Td>{xp}</Td>
                </Tr>
                <Tr>
                    <Td>level:</Td>
                    <Td>{level}</Td>
                </Tr>
                <Tr>
                    <Td>streak:</Td>
                    <Td>{streak}</Td>
                </Tr>
            </Tbody>
        </Table>
    </Box>
  )
}
