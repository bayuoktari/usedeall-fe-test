import { combineReducers } from "redux"
import bookReducer from "./books"
import categoryReducer from "./category"

const reducers = combineReducers({
  category: categoryReducer,
  book: bookReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
