import { ChangeEvent, useCallback, useRef } from "react"
import { Button, ButtonProps } from "@mui/material"

export interface FileSelectionButtonProps extends ButtonProps {
  onFileSelected: (file: File) => void
}

export function FileSelectionButton(props: FileSelectionButtonProps) {
  const { onFileSelected, ...buttonProps } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files.length === 1) {
        const file = files[0]
        onFileSelected(file)
      }
    },
    [onFileSelected],
  )

  return (
    <>
      <Button {...buttonProps} onClick={handleClick} />
      <input
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
        multiple={false}
        accept=".lock"
        hidden
      />
    </>
  )
}
