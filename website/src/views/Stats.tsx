import {
    Box,
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Heading,
    Text,
    VStack,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    HStack,
    Progress,
    ChakraProvider,
    Divider,
    Badge
} from "@chakra-ui/react";
import { useState } from "react";
import { getUser } from '../actions/actions'
import UserTable from "../components/UserTable";
import {CheckIcon, QuestionOutlineIcon} from "@chakra-ui/icons";
import theme from '../theme'

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
      <ChakraProvider theme={theme}>
    <Box w="container.lg">
        <Box
            w={'80%'}
            my={10}
        >
            <Heading
            color={'purple.800'}
            >
                Stats
            </Heading>
            <Text>
                Type your User ID below to check your stats!
            </Text>
        </Box>

        <HStack>
        <InputGroup w={'fit-content'}>
            <Input
                focusBorderColor='purple.800'
                placeholder="User ID" w="auto" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <InputRightElement children={
                <Popover>
                    <PopoverTrigger>
                        <Button variant={'ghost'}
                                size={'s'}>
                            <QuestionOutlineIcon
                            color={'gray.400'}/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody fontSize={'xs'}>
                            Make sure you have Developer Mode turned on in Discord, then right click on your username
                        in a chat and click 'Copy ID'</PopoverBody>
                    </PopoverContent>
                </Popover>
                } />
        </InputGroup>
            <Button onClick={updateUser}>Load Stats</Button>
        </HStack>

        {userId && (<Box bg={'gray.50'}
        my={20} w={'50%'} p={5} borderRadius={'md'}
        >
            <Heading>{tag}</Heading>
            <Box my={5}>
                <Text
                    fontSize={'2xl'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                    mb={2}
                >Level {level}</Text>
                <Progress value={80} borderRadius={'md'}
                          w={'90%'}
                />
                <Text
                    fontSize={'16px'}
                    textAlign={'end'}
                    w={'90%'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                    mt={1}
                    mb={4}
                >{xp}/1000 XP</Text>
                <Divider mb={4}/>
                <HStack><Text
                    fontSize={'2xl'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                >Streak</Text>
                    <Badge
                    bg={'#e0dde7'}
                    >#📆-daily-standup</Badge>

                </HStack>

                <Text
                    fontSize={'16px'}
                    color={'purple.800'}
                >{streak} days</Text>

            </Box>

        </Box>)}
        {/*<UserTable userId={userId} tag={tag} xp={xp} level={level} streak={streak} />*/}
    </Box>
      </ChakraProvider>
  )
}
