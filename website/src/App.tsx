import {
  ChakraProvider,
  theme,
  Box,
} from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import Nav from "./components/Nav"
import About from "./views/About"
import Stats from "./views/Stats"
import Admin from "./views/Admin"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Nav />
    <Box display="grid" placeItems="center" w="full" h="full" m={4} overflow="hidden">
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Box>
  </ChakraProvider>
)
