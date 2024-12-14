import { useState } from "react"
import { Typography } from "@mui/material"
import { FileSelectionButton } from "./FileSelectionButton.tsx"
import { useTranslation } from "react-i18next"

export function LockfileSelection() {
  const [file, setFile] = useState<File | undefined>()
  const { t } = useTranslation()

  if (!file) {
    return (
      <FileSelectionButton onFileSelected={setFile} variant="contained">
        {t("lockfile-selection.button-text")}
      </FileSelectionButton>
    )
  }

  return <Typography>File: {file.name}</Typography>
}
