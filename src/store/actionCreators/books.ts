import { Dispatch } from "redux"
import axios from "../../config/axios"

import * as actionTypes from "../actionTypes/books"

const fetchBookList =
  (categoryId?: number, page?: number, size?: number) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: actionTypes.GET_BOOKS_PENDING,
    })
    try {
      const { data } = await axios({
        method: "post",
        data: {
          url: `/fee-assessment-books?page=${page || 1}&categoryId=${
            categoryId || 1
          }&size=${size || 8}`,
        },
      })
      dispatch({
        type: actionTypes.GET_BOOKS_SUCCESS,
        payload: data,
      })
    } catch (err: any) {
      dispatch({
        type: actionTypes.GET_BOOKS_FAIL,
        payload: err.message,
      })
    }
  }

export default fetchBookList
