import { TreeElement } from "../types/TreeElement.ts"
import { Box, Button, Stack } from "@mui/material"
import { useAppDispatch } from "../store/store.ts"
import { collapse, expand } from "../store/dependenciesSlice.ts"

interface DependencyTableRowProps {
  treeElement: TreeElement
}

export function DependencyTableRow(props: DependencyTableRowProps) {
  return (
    <Box sx={{ paddingLeft: props.treeElement.level }}>
      <Stack direction="row">
        {props.treeElement.key}
        <Expander treeElement={props.treeElement} />
      </Stack>
    </Box>
  )
}

interface ExpanderProps {
  treeElement: TreeElement
}

function Expander(props: ExpanderProps) {
  const dispatch = useAppDispatch()
  const expansionState = props.treeElement.expansionState

  switch (expansionState) {
    case "EXPANDED":
      return (
        <Button
          onClick={() => dispatch(collapse(props.treeElement.dependency.id))}
        >
          Collapse
        </Button>
      )
    case "COLLAPSED":
      return (
        <Button
          onClick={() => dispatch(expand(props.treeElement.dependency.id))}
        >
          Expand
        </Button>
      )
    default:
      return null
  }
}
