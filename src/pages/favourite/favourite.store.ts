import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../redux/store";
import { User } from "../user/user.store";

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
    }
  }
})

const { startLoading, setUsers } = slice.actions

export const getLikedUsers = (): AppThunk => (dispatch) => {
  dispatch(startLoading())
  const existedLikedStorage = localStorage.getItem('likedUsers')
  if (existedLikedStorage) {
    const likedUsers: User[] = JSON.parse(existedLikedStorage)
    dispatch(setUsers(likedUsers))
  } else {
    dispatch(setUsers([]))
  }
}

export const likeUser = (user: User): AppThunk => (dispatch) => {
  const existedLikedStorage = localStorage.getItem('likedUsers')
  let likedUsers: User[] = []
  if(existedLikedStorage) {
    likedUsers = JSON.parse(existedLikedStorage)
  }
  const isExist = likedUsers.find(likedUser => likedUser.login === user.login)
  if (!isExist) {
    user = Object.assign({}, user)
    user.is_liked = true
    likedUsers.push(user)
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers))
    dispatch(setUsers(likedUsers))  
  }
}

export const unLikeUser = (user: User): AppThunk => (dispatch) => {
  const existedLikedStorage = localStorage.getItem('likedUsers')
  let likedUsers: User[] = []
  if(existedLikedStorage) {
    likedUsers = JSON.parse(existedLikedStorage)
  }
  const unlikedUserIndex = likedUsers.findIndex(likedUser => likedUser.login === user.login)

  likedUsers.splice(unlikedUserIndex, 1)
  localStorage.setItem('likedUsers', JSON.stringify(likedUsers))
  dispatch(setUsers(likedUsers))
}

export default slice.reducer