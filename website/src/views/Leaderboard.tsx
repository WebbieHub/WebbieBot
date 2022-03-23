import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Divider,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    StatHelpText
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../actions/actions'

export default function Leaderboard() {
    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        getAllUsers()
            .then(res => {
                if (res.data && res.data.users) {
                    // sort by level
                    const sorted: any[] = (res.data.users as any[])
                        .sort((a: any, b: any) => {
                            return b.level - a.level;
                        })
                    setUsers(sorted);
                }
            })
    }, [])

    return (
        <Box>
            <StatGroup>
                {users.map((user, index) => (
                    index <= 2 ? <Stat>
                        <StatLabel>{index + 1}</StatLabel>
                        <StatNumber>{user.tag}</StatNumber>
                        <StatHelpText>{user.level}</StatHelpText>
                    </Stat> : <></>
                ))}
            </StatGroup>
            <Divider />
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Position</Th>
                        <Th>Username</Th>
                        <Th>Level</Th>
                    </Tr>
                </Thead>
                <Tbody>{users.map((user, index) => (
                    <Tr key={user.tag}>
                        <Td>{index + 1}</Td>
                        <Td>{user.tag}</Td>
                        <Td>{user.level}</Td>
                    </Tr>
                ))}</Tbody>
            </Table>
        </Box> 
    )
}
