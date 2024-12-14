import { useSelector } from "react-redux"
import { selectTreeElements } from "../store/dependenciesSlice.selectors.ts"
import {  Stack } from "@mui/material"
import {DependencyTableRow} from "./DependencyTableRow.tsx";

export function DependencyTable() {
  const treeElements = useSelector(selectTreeElements)

  return (
    <Stack>
      {treeElements.map((treeElement) => (
        <DependencyTableRow key={treeElement.key} treeElement={treeElement} />
      ))}
    </Stack>
  )
}
