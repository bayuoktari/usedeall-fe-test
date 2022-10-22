import axios from "axios"
import { Dispatch } from "redux"

import * as actionTypes from "../actionTypes/category"

const fetchCategoryList = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: actionTypes.GET_CATEGORY_LIST_PENDING,
  })
  try {
    const { data } = await axios({
      method: "get",
      url: "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories",
    })
    dispatch({
      type: actionTypes.GET_CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (err: any) {
    dispatch({
      type: actionTypes.GET_CATEGORY_LIST_FAIL,
      payload: err.message,
    })
  }
}

export default fetchCategoryList