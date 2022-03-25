import {
  ChakraProvider,
  theme,
  Box,
} from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import Nav from "./components/Nav"
import Home from "./views/Home"
import Stats from "./views/Stats"
import Admin from "./views/Admin"
import Leaderboard from "./views/Leaderboard"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Nav />
    <Box display="grid" placeItems="center" w="full" h="full" m={0} overflow="hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Box>
  </ChakraProvider>
)
