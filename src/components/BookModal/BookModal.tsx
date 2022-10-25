import React from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material"
import {
  AccessTimeFilled,
  MenuBook,
  ExpandMore,
  Close,
} from "@mui/icons-material"
import styled from "styled-components"

import { Book, BookSection } from "../../store/reducers/books"

interface Props {
  isOpen: boolean
  handleClose: () => void
  content?: Book
}

const StyledImg = styled("img")`
  width: 100%;
`
const BookModal = ({ isOpen, handleClose, content }: Props) => {
  const getMinutes = (time?: number) => {
    if (!time) {
      return 0
    }
    return Math.floor(time / 60)
  }
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box width="50%">
          <Paper>
            <Box p={3}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton color="error" onClick={() => handleClose()}>
                  <Close />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <StyledImg src={content?.cover_url} alt="book" />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box display="flex" flexDirection="column">
                    <Box mb={3}>
                      <Typography variant="h4">{content?.title}</Typography>
                      <Typography variant="subtitle2">
                        {content?.authors.join(", ")}
                      </Typography>
                      <Box display="flex" gap={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MenuBook color="secondary" />
                          <Typography variant="subtitle2">
                            {content?.sections.length} Chapters
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccessTimeFilled fontSize="small" color="info" />
                          <Typography variant="subtitle2">
                            {getMinutes(content?.audio_length)} min
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2">
                      {content?.description}
                    </Typography>
                    <Box mt={2}>
                      {content?.sections.map(
                        (item: BookSection, index: number) => (
                          <Accordion key={item.title}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="subtitle2">
                                {index + 1}. {item.title}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant="subtitle1">
                                {item.content}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ),
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Modal>
  )
}

export default BookModal
