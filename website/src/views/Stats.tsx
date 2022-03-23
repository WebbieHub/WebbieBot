import {
    Box,
    Input,
    Button,
    Heading,
    Text,
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
    Badge,
    InputLeftAddon,
    Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { getUser } from '../actions/actions'
import {QuestionOutlineIcon} from "@chakra-ui/icons";
import theme from '../theme'

export default function Stats() {
  const [userId, setUserId] = useState("");
  const [tag, setTag] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpToNext, setXpToNext] = useState(0);

  const updateUser = () => {
    if (tag) {
      getUser(tag)
        .then(res => {
            console.log('?', res)
            if (res.data && res.data.user) {
                setXp(res.data.user.xp);
                setLevel(res.data.user.level);
                setStreak(res.data.user.streak);
                setTag(res.data.user.tag);
                setUserId(res.data.user.userId);
            }
            if (res.data && res.data.xpToNext) {
                setXpToNext(res.data.xpToNext);
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
                Type your Username below to check your stats!
            </Text>
        </Box>

        <HStack
            p={1}
        >
        <InputGroup
            w={'fit-content'}
            alignItems={'center'}
        >
            <InputLeftAddon children='@' />
            <Input
                focusBorderColor='purple.800'
                placeholder="Username#1234" value={tag} onChange={(e) => setTag(e.target.value)} />
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
                            Find this on the bottom left corner of discord. Be sure to include your
                            name and the 4 digits after the #</PopoverBody>
                    </PopoverContent>
                </Popover>
                } />
        </InputGroup>
            <Button onClick={updateUser}>Load Stats</Button>
        </HStack>

        {userId && (<Box bg={'gray.50'}
        my={20} w={'60%'} p={5} borderRadius={'md'}
        >
            <Heading>{tag}</Heading>
            <Box my={5}>
                <Text
                    fontSize={'2xl'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                    mb={2}
                >Level {level}</Text>
                <Progress value={(xp/(xpToNext + xp))*100} borderRadius={'md'}
                          w={'90%'}
                />
                <Text
                    fontSize={'16px'}
                    textAlign={'end'}
                    w={'90%'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                    mt={2}
                    mb={4}
                >{xp}/{xpToNext + xp} XP</Text>
                <Divider mb={4}/>
                <HStack><Text
                    fontSize={'2xl'}
                    color={'purple.800'}
                    fontWeight={'medium'}
                >Streak</Text>
                    <Badge
                    bg={'gray.200'}
                    >#📆-daily-standup</Badge>

                </HStack>

                <HStack mt={4}>
                    <Flex
                        bg={'gray.200'}
                        w={'2.5rem'}
                        h={'2.5rem'}
                        align={'center'}
                        justify={'center'}
                        borderRadius={'50%'}
                    >
                        <Text
                            fontSize={'18px'}
                            fontWeight={'medium'}
                        >{streak}</Text>
                    </Flex>
                    <Text
                        fontSize={'18px'}
                    >day{+ streak === 1? '': 's'}</Text>

                </HStack>

            </Box>

        </Box>)}
    </Box>
      </ChakraProvider>
  )
}
