import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { Search } from "@mui/icons-material"
import type { Dispatch } from "redux"

import Chip from "../../components/Chip"
import BookItem from "../../components/BookItem"
import BookModal from "../../components/BookModal"

import {
  fetchCategoryList,
  setActiveCategory,
} from "../../store/actionCreators/category"

import useTypedSelector from "../../hooks/useTypedSelector"
import fetchBookList from "../../store/actionCreators/books"

import type { Book } from "../../store/reducers/books"

function Home() {
  const dispatch: Dispatch<any> = useDispatch()
  const categoryState = useTypedSelector((state) => state.category)
  const bookState = useTypedSelector((state) => state.book)

  const { categoryList, isLoading } = categoryState
  const { isLoading: bookLoading, bookList } = bookState

  const activeCategory = categoryList.find((item) => item.isActive)

  const [bookItems, setBookItems] = useState<Book[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSetActiveCategory = (id: number) => {
    setCurrentPage(1)
    dispatch(setActiveCategory(id))
    dispatch(fetchBookList(id))
  }

  const handleChangePage = (selectedPage: number) => {
    setCurrentPage(selectedPage)
    dispatch(fetchBookList(activeCategory?.id || 1, selectedPage))
  }

  const handleSearch = (book: Book[], keyword: string) => {
    const searchTerm = keyword.toLowerCase()
    return book.filter((value) => {
      return value.title.toLowerCase().match(new RegExp(searchTerm, "g"))
    })
  }

  const handleInputSearchOnChange = (keyword: string) => {
    if (keyword.length > 1) {
      const search = handleSearch(bookItems, keyword)
      setBookItems(search)
    } else {
      setBookItems(bookList)
    }
  }

  const handleOpenDetail = (detail: Book) => {
    setIsModalOpen(true)
    setSelectedBook(detail)
  }

  const renderBookList = () => {
    if (bookItems.length) {
      return bookItems.map((item: Book) => (
        <BookItem
          detail={item}
          key={item.id}
          handleClickDetail={() => handleOpenDetail(item)}
        />
      ))
    }
    return (
      <Box pt={3}>
        <Typography variant="h6">There is No Book found</Typography>
      </Box>
    )
  }

  useEffect(() => {
    dispatch(fetchCategoryList())
    dispatch(fetchBookList())
  }, [dispatch])

  useEffect(() => {
    setBookItems(bookList)
  }, [bookList])

  return (
    <Container maxWidth="xl">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || bookLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BookModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        content={selectedBook}
      />
      <Box display="flex" flexDirection="column" pb={6}>
        <Box display="flex" justifyContent="center" py={6}>
          <Typography variant="h3">Boku Boku List</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box gap={1} display="flex" flexWrap="wrap" justifyContent="center">
            {categoryList.length > 0 &&
              categoryList.map((item) => (
                <Chip
                  label={item.name}
                  key={item.id}
                  isActive={item.isActive}
                  handleClick={() => handleSetActiveCategory(item.id)}
                />
              ))}
          </Box>
        </Box>
        <Box mt={2}>
          <Paper elevation={3}>
            <Box p={3}>
              <Box display="flex" justifyContent="center" mb={4}>
                <TextField
                  variant="outlined"
                  placeholder="Search your favorite book"
                  sx={{ width: "50%" }}
                  onChange={(e) => {
                    handleInputSearchOnChange(e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ marginRight: "12px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Grid container spacing={3} justifyContent="center">
                {renderBookList()}
              </Grid>
              {bookItems.length > 0 && (
                <Box mt={3} display="flex" justifyContent="center">
                  <Pagination
                    count={10}
                    color="secondary"
                    page={currentPage}
                    onChange={(_, selectedPage: number) =>
                      handleChangePage(selectedPage)
                    }
                  />
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
