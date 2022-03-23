import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../redux/store";
import { User } from "../user/user.store";
import FavouriteApi from "./favourite.api";

export interface FavouriteState {
  users: Array<User>,
  isLoading: boolean,
  error: string | null
}

const initialState = {
  users: [],
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    setUsers: (state, action) => {
      state.users = action.payload
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { startLoading, setUsers, setError } = slice.actions

export const getLikedUsers = (): AppThunk => (dispatch) => {
  dispatch(startLoading())
  FavouriteApi.getLikedUsers()
    .then((res: User[]) => {
      console.log(res)
      dispatch(setUsers(res))
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err))
    })
}

export const likeUser = (user: User): AppThunk => () => {
  FavouriteApi.likeUser(user)
    .then((res: any) => {
      console.log('Successfully liked user', res)
    })
    .catch((err: any) => {
      console.log('Failed to like user', err)
    })
}

export const unLikeUser = (user: User): AppThunk => () => {
  FavouriteApi.unLikeUser(user)
    .then((res: any) => {
      console.log('Successfully unliked user', res)
    })
    .catch((err: any) => {
      console.log('Failed to unlike user', err)
    })
}

export default slice.reducer