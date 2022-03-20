import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import Nav from "./components/Nav"
import About from "./views/About"
import Stats from "./views/Stats"
import Admin from "./views/Admin"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Nav />
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </ChakraProvider>
)
