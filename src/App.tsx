import "./App.css"
import { CssBaseline, ThemeProvider, Typography } from "@mui/material"
import { LockfileSelection } from "./LockfileSelection/LockfileSelection.tsx"
import { theme } from "./theme.ts"
import { store } from "./store/store.ts"
import { Provider } from "react-redux"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import "./i18n/i18n.ts"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Yarn Lock Analyzer
          </Typography>
          <LockfileSelection />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
