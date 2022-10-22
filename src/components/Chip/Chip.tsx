import React from "react"
import { Chip as DefaultChip } from "@mui/material"

interface Props {
  label: string
  isActive?: boolean
}

const Chip = ({ label, isActive }: Props) => (
  <DefaultChip
    label={label}
    variant="outlined"
    color={!isActive ? "primary" : "warning"}
    clickable
  />
)

export default Chip
