import { Dispatch } from "redux"
import store from ".."
import axios from "../../config/axios"

import * as actionTypes from "../actionTypes/category"

import type { Category } from "../reducers/category"

export const fetchCategoryList = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: actionTypes.GET_CATEGORY_LIST_PENDING,
  })
  try {
    const { data } = await axios({
      method: "post",
      data: {
        url: "/fee-assessment-categories",
      },
    })
    const newData = data.map((item: Category) => ({ ...item, isActive: false }))
    newData[0].isActive = true

    dispatch({
      type: actionTypes.GET_CATEGORY_LIST_SUCCESS,
      payload: newData,
    })
  } catch (err: any) {
    dispatch({
      type: actionTypes.GET_CATEGORY_LIST_FAIL,
      payload: err.message,
    })
  }
}

export const setActiveCategory =
  (id: number) => (dispatch: Dispatch<Action>) => {
    const { categoryList } = store.getState().category
    const items = categoryList.map((item) =>
      item.id === id
        ? { ...item, isActive: true }
        : { ...item, isActive: false },
    )

    dispatch({
      type: actionTypes.SET_ACTIVE_CATEGORY,
      payload: items,
    })
  }
