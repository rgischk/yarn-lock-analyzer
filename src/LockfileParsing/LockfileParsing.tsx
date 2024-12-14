import { Typography } from "@mui/material"
import { LockfileInputButton } from "./LockfileInputButton.tsx"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../store/store.ts"
import { fileSelected } from "../store/parsingSlice.fileSelectedThunk.ts"
import { useSelector } from "react-redux"
import {
  selectIsParsing,
  selectParsedLockfile,
} from "../store/parsingSlice.selectors.ts"
import { LoadingOverlay } from "./LoadingOverlay.tsx"
import { ParsingError } from "./ParsingError.tsx"

export function LockfileParsing() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const lockfile = useSelector(selectParsedLockfile)
  const isParsing = useSelector(selectIsParsing)

  if (!lockfile) {
    return (
      <>
        <LockfileInputButton
          onFileSelected={(file) => dispatch(fileSelected(file))}
          variant="contained"
          disabled={isParsing}
        >
          {t("lockfile-parsing.button-text")}
          {isParsing && <LoadingOverlay />}
        </LockfileInputButton>
        <ParsingError />
      </>
    )
  }

  return (
    <Typography>
      Lockfile has {Object.keys(lockfile).length - 1} entries!
    </Typography>
  )
}
