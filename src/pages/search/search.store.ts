import { createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../redux/store"
import SearchApi from './search.api'
import UserApi from './../user/user.api'
import { User } from './../user/user.store'

export interface SearchState {
  keyword: string,
  page: number,
  users: Array<any>,
  totalCount: number,
  isLoading: boolean,
  error: string | null
}

const initialState: SearchState = {
  keyword: '',
  page: 1,
  users: [],
  totalCount: 0,
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    startLoading: state => {
      state.isLoading = true
    },
    setUsers: (state, action) => {
      state.users = action.payload
      state.isLoading = false
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { setKeyword, setPage, startLoading, setUsers, setTotalCount, setError } = slice.actions

export const searchUsers = (keyword: string, page: number, size: number): AppThunk => async (dispatch) => {
  dispatch(setKeyword(keyword))
  dispatch(setPage(page))
  dispatch(setUsers([]))
  dispatch(startLoading())
  SearchApi.searchUsers(keyword, page, size)
    .then((res: any) => {
      let newUsers: User[] = []
      res?.items.forEach((user: User, index: number) => {
        const isLiked = checkLikedUser(user)
        if (isLiked)
          user.is_liked = true
        newUsers.push(user)
        // i know this is a bad practice, but i can't find any other way to get followers & following number data
        UserApi.getUser(user.login)
          .then((data: User) => {
            const newUser = data
            const isLiked = checkLikedUser(newUser)
              if (isLiked)
                newUser.is_liked = true

            newUsers.splice(index, 1, newUser)
            dispatch(setUsers([ ...newUsers ]))
          })
          .catch((err: any) => {
            console.log(err)
          })

      })
      dispatch(setTotalCount(res?.total_count))
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const updateLikedUser = (user: User, isLiked: boolean): AppThunk => (dispatch, getStates) => {
  const users: User[] = JSON.parse(JSON.stringify(getStates().search.users))
  const likedUser = users.find(u => u.login === user.login)

  if(likedUser)
    likedUser.is_liked = isLiked

  dispatch(setUsers(users))
}

function checkLikedUser(user: User) {
  const existedLikedStorage = localStorage.getItem('likedUsers')
  let likedUsers: User[] = []
  if(existedLikedStorage) {
    likedUsers = JSON.parse(existedLikedStorage)
  }
  return likedUsers.find(likedUser => likedUser.login === user.login) ? true : false
}

export const resetSearch = (): AppThunk => (dispatch) => {
  dispatch(setKeyword(''))
  dispatch(setUsers([]))
  dispatch(setError(null))
  dispatch(setTotalCount(0))
}

export default slice.reducer