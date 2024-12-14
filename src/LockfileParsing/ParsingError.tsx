import { useSelector } from "react-redux"
import { selectIsError } from "../store/parsingSlice.selectors.ts"
import { Snackbar } from "@mui/material"
import { useAppDispatch } from "../store/store.ts"
import { clearParseError } from "../store/parsingSlice.ts"
import { useTranslation } from "react-i18next"

export function ParsingError() {
  const isError = useSelector(selectIsError)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!isError) {
    return null
  }

  return (
    <Snackbar
      open
      autoHideDuration={5000}
      onClose={() => dispatch(clearParseError())}
      message={t("lockfile-parsing.error-text")}
    />
  )
}
