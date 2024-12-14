import { Autocomplete, Box, Chip, TextField } from "@mui/material"
import { useSelector } from "react-redux"
import {
  selectAllPossibleSearchItems,
  selectCurrentSearchItems,
} from "../store/dependenciesSlice.selectors.ts"
import { useTranslation } from "react-i18next"
import { SearchItem } from "../types/SearchItem.ts"

export function Search() {
  const allPossibleSearchItems = useSelector(selectAllPossibleSearchItems)
  const currentSearchItems = useSelector(selectCurrentSearchItems)

  return (
    <Autocomplete
      multiple
      options={allPossibleSearchItems}
      defaultValue={currentSearchItems}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => <TextField {...params} />}
      renderOption={(props, option, _, ownerState) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps}>
            <OptionComponent
              option={option}
              optionLabel={ownerState.getOptionLabel(option)}
            />
          </li>
        )
      }}
      renderTags={(value: SearchItem[], getTagProps, ownerState) =>
        value.map((option: SearchItem, index: number) => {
          const { key, ...tagProps } = getTagProps({ index })
          return (
            <Chip
              variant="outlined"
              label={
                <Box component="span">
                  <OptionComponent
                    option={option}
                    optionLabel={ownerState.getOptionLabel(option)}
                  />
                </Box>
              }
              key={key}
              {...tagProps}
            />
          )
        })
      }
    />
  )
}

interface OptionComponentProps {
  optionLabel: string
  option: SearchItem
}

function OptionComponent(props: OptionComponentProps) {
  const { t } = useTranslation()

  return (
    <>
      {props.optionLabel}
      {props.option.version ? null : (
        <Box
          component="span"
          sx={{
            paddingLeft: 1,
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          {t("search.all-versions-suffix")}
        </Box>
      )}
    </>
  )
}
