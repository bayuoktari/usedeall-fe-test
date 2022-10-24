import * as actionTypes from "../actionTypes/books"

export interface BookSection {
  title: string
  content: string
}
export interface Book {
  id: number
  title: string
  category_id: number
  authors: string[]
  cover_url: string
  description: string
  sections: BookSection[]
  audio_length: number
}

interface State {
  isLoading: boolean
  bookList: Book[]
  error: null | string
}

const initialState: State = {
  isLoading: false,
  bookList: [],
  error: null,
}

const bookReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.GET_BOOKS_PENDING:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookList: action.payload,
      }
    case actionTypes.GET_BOOKS_FAIL:
      return {
        ...state,
        isLoading: false,
        bookList: [],
        error: action.payload,
      }
    case actionTypes.GET_BOOKS_BY_SEARCH:
      return {
        ...state,
        bookList: action.payload,
      }
    default:
      return state
  }
}

export default bookReducer
