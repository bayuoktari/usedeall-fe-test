import * as actionTypes from "../actionTypes/category"

interface Category {
  id: number
  name: string
}

interface State {
  isLoading: boolean
  categoryList: Category[]
  error: string | null
}

const initialState: State = {
  isLoading: false,
  categoryList: [],
  error: null,
}

const categoryReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: action.payload,
      }
    case actionTypes.GET_CATEGORY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        categoryList: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default categoryReducer
