import { LockfileParsing } from "./LockfileParsing/LockfileParsing.tsx"
import { Stack, Typography } from "@mui/material"
import { Search } from "./Search/Search.tsx"
import { DependencyTable } from "./Dependencies/DependencyTable.tsx"

export function AppLayout() {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Yarn Lock Analyzer
      </Typography>
      <Search />
      <DependencyTable />
      <Stack alignItems="center" justifyContent="center" flex={1}>
        <LockfileParsing />
      </Stack>
    </Stack>
  )
}
