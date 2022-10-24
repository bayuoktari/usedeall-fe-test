import React from "react"
import { Chip as DefaultChip } from "@mui/material"

interface Props {
  handleClick?: () => void
  label: string
  isActive?: boolean
}

const Chip = ({ handleClick, label, isActive }: Props) => (
  <DefaultChip
    label={label}
    variant="outlined"
    color={!isActive ? "primary" : "warning"}
    clickable
    onClick={() => handleClick && handleClick()}
  />
)

export default Chip
