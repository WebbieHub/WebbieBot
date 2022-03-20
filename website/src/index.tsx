import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
)
