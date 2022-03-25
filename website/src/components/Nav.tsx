import { Box, theme, Button, Flex, IconButton, Icon } from '@chakra-ui/react'
import { AtSignIcon, InfoIcon, LockIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { AiFillGithub } from 'react-icons/ai'
import { MdHome, MdLeaderboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
      <Box
        w={"full"}
        backgroundColor={theme.colors.purple[800]}
        textColor={theme.colors.gray[200]}
        fontSize={theme.fontSizes['3xl']}
        p={"2"}
      >
          <Flex justify="space-between">
            <Box>
                <Link to="/"><Button _light={{ textColor: "purple.800" }} leftIcon={<Icon as={MdHome} w={6} h={6} />} variant="solid" as="a">Home</Button></Link>
                <Link to="/stats"><Button _light={{ textColor: "purple.800" }} leftIcon={<AtSignIcon/>} variant="solid" as="a" m="2">Stats</Button></Link>
                <Link to="/leaderboard"><Button _light={{ textColor: "purple.800" }} leftIcon={<Icon as={MdLeaderboard} w={6} h={6} />} variant="solid" as="a">Leaderboard</Button></Link>
            </Box>
            <Box>
                <ColorModeSwitcher justifySelf="flex-end" />
                <IconButton
                    size="md"
                    fontSize="lg"
                    variant="ghost"
                    color="current"
                    marginLeft="2"
                    icon={<Icon as={AiFillGithub} w={6} h={6} />}
                    aria-label={`See the Source Code`}
                    as="a"
                    href="https://github.com/WebbieHub/WebbieBot"
                />
            </Box>
          </Flex>
      </Box>
  )
}
