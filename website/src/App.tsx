import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import Admin from "./views/Admin"
import Nav from "./components/Nav"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Nav />
    <Routes>
      <Route path="/" element={<div>asd</div>} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </ChakraProvider>
)
