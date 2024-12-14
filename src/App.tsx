import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store.ts"
import { decrement, increment } from "./counterSlice.ts"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material"

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Yarn Lock Analyzer
      </Typography>
      <Stack sx={{ alignItems: "center" }}>
        <Card sx={{ width: "500px" }}>
          <CardContent>
            <Typography>Count: {count}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => dispatch(increment())}>Increase</Button>
            <Button onClick={() => dispatch(decrement())}>Decrease</Button>
          </CardActions>
        </Card>
      </Stack>
    </>
  )
}

export default App
