import {
    Box,
    Table,
    Thead,
    Tbody,
    Text,
    Tr,
    Th,
    Td,
    Divider,
    Image, HStack, Heading, VStack, Flex, theme, color
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../actions/actions'
// @ts-ignore
import gold from "../img/gold.png"
// @ts-ignore
import silver from '../img/silver.png'
// @ts-ignore
import bronze from '../img/bronze.png'
import { FaGratipay } from 'react-icons/fa'

export default function Leaderboard() {
    const [users, setUsers] = useState<any[]>([])
    const icons = [gold, silver, bronze]

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
            <HStack
                spacing={12}
                my={10}
                bg={'gray.50'}
                _dark={{bg: "gray.900"}}
                p={5} borderRadius={'2xl'}
                justifyContent={'center'}
            >
                {users.map((user, index) => (
                    index <= 2 ? <VStack>
                            <Image
                                src={icons[index]}
                            />
                        <Heading
                            fontWeight={'medium'}
                        size={'lg'}>{user.tag}</Heading>
                        <Flex
                            _dark={{bg: "gray.800"}}
                            bg={'gray.200'}
                            w={'2rem'}
                            h={'2rem'}
                            align={'center'}
                            justify={'center'}
                            borderRadius={'50%'}
                        >
                        <Text fontSize={'18px'}
                        >{user.level}</Text>
                        </Flex>

                    </VStack> : <></>
                ))}
            </HStack>
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
