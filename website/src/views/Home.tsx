import React from 'react'
import { Box, Heading, Text, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Divider } from '@chakra-ui/react'

const actionMap = [
  {desc: 'Daily Standup', value: '15'},
  {desc: 'Post in Challenges', value: '5'},
  {desc: 'Reply with Feedback', value: '5'},
  {desc: 'Reply to a Message', value: '2'},
  {desc: 'Send a Message', value: '1'}
]

export default function Home() {
  return (
    <Box>
      <Heading>⚒️Work In Progress⚒️</Heading>
      <Text>WebbieHub's site is under construction, check back again soon!</Text>
      <Divider />
      <Table>
        <TableCaption>Base XP values per action <br /> Increase your xp multiplier by participating in daily standup and challenges</TableCaption>
        <Thead>
          <Tr>
            <Th>Action</Th>
            <Th>Base XP Yield</Th>
          </Tr>
        </Thead>
        <Tbody>
          {actionMap.map(action => <Tr>
            <Td>{action.desc}</Td>
            <Td>{action.value}</Td>
          </Tr>)}
        </Tbody>
      </Table>
    </Box>
  )
}
