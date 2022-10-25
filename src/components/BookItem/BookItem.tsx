import React from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import styled from "styled-components"

import type { Book } from "../../store/reducers/books"

interface Props {
  detail: Book
  handleClickDetail: (detail: Book) => void
}

const StyeldImg = styled("img")`
  width: 200px;
  margin-bootm: 18px;
`

const BookItem = ({ detail, handleClickDetail }: Props) => (
  <Grid item xs={12} sm={6} md={3}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={3}
      gap={2}
    >
      <StyeldImg src={detail.cover_url} alt="cover" />
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Typography variant="subtitle1">{detail.title}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClickDetail(detail)}
        >
          Book Detail
        </Button>
      </Box>
    </Box>
  </Grid>
)

export default BookItem
