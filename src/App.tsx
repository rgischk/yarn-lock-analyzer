import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./theme.ts"
import { store } from "./store/store.ts"
import { Provider } from "react-redux"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import "./i18n/i18n.ts"
import { AppLayout } from "./AppLayout.tsx"

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <AppLayout />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
