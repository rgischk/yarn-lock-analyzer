import "./App.css"
import { ThemeProvider, Typography } from "@mui/material"
import { LockfileSelection } from "./LockfileSelection/LockfileSelection.tsx"
import { theme } from "./theme.ts"
import { store } from "./store/store.ts"
import { Provider } from "react-redux"

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            Yarn Lock Analyzer
          </Typography>
          <LockfileSelection />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App
