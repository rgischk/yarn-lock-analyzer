import { useState } from "react"
import { Typography } from "@mui/material"
import { FileSelectionButton } from "./FileSelectionButton.tsx"

export function LockfileSelection() {
  const [file, setFile] = useState<File | undefined>()

  if (!file) {
    return (
      <FileSelectionButton onFileSelected={setFile}>
        Please select a file...
      </FileSelectionButton>
    )
  }

  return <Typography>File: {file.name}</Typography>
}
