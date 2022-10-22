import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Container, Paper, Typography } from "@mui/material"

import type { Dispatch } from "redux"

import fetchCategoryList from "../../store/actionCreators/category"

function Home() {
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, [dispatch])
  return (
    <Container maxWidth="xl">
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" py={6}>
          <Typography variant="h3">Start your Reading Streak!</Typography>
        </Box>
        <Box>
          <Paper elevation={3}>
            <Box p={3}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
              quia rem sunt eum? Exercitationem nulla reiciendis magnam dolor
              reprehenderit, consequatur aperiam rerum labore consectetur
              excepturi odio cumque tempora eos nam atque voluptates? Non
              repudiandae vel inventore nesciunt obcaecati sapiente omnis?
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
