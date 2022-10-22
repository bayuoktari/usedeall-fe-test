import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Container, Paper, Stack, Typography } from "@mui/material"
import type { Dispatch } from "redux"

import Chip from "../../components/Chip"

import fetchCategoryList from "../../store/actionCreators/category"
import useTypedSelector from "../../hooks/useTypedSelector"

function Home() {
  const dispatch: Dispatch<any> = useDispatch()
  const propsFromSelector = useTypedSelector((state) => state.category)

  const { categoryList } = propsFromSelector

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, [dispatch])

  return (
    <Container maxWidth="xl">
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" py={6}>
          <Typography variant="h3">Start your Reading Streak!</Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Stack direction="row" spacing={1}>
            {categoryList.length > 0 &&
              categoryList.map((item) => (
                <Chip label={item.name} key={item.id} />
              ))}
          </Stack>
        </Box>
        <Box mt={2}>
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
