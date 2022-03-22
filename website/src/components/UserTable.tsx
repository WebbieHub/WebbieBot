import React from 'react'
import { Table, TableCaption, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"

interface UserTablePropsType {
    xp: number,
    level: number,
    streak: number,
    userId: string,
    tag: string,
}

export default function UserTable(props: UserTablePropsType) {
  return (
    <Table variant="simple">
        <TableCaption>Data for User &lt;@{props.userId}&gt;</TableCaption>
        <Thead>
            <Tr>
                <Th>User</Th>
                <Th>{props.tag}</Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr>
                <Td>xp:</Td>
                <Td>{props.xp}</Td>
            </Tr>
            <Tr>
                <Td>level:</Td>
                <Td>{props.level}</Td>
            </Tr>
            <Tr>
                <Td>streak:</Td>
                <Td>{props.streak}</Td>
            </Tr>
        </Tbody>
    </Table>
  )
}
