import { createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../redux/store"
import UserApi from "./user.api"
import { getLikedUsers } from "../favourite/favourite.store"

export interface User {
	id: number,
  login: string,
	node_id: string,
	avatar_url: string,
	gravatar_id: string,
	url: string,
	html_url: string,
	followers_url: string,
	following_url: string,
	gists_url: string,
	starred_url: string,
	subscriptions_url: string,
	organizations_url: string,
	repos_url: string,
	events_url:string,
	received_events_url: string,
	type: string,
	site_admin: boolean,
  score: number
	name?: string,
	company?: string,
	blog?: string,
	location?: string,
	email?: string,
	hireable?: boolean,
	bio?: string,
	twitter_username?: string,
	public_repos?: number,
	public_gists?: number,
	followers?: number,
	following?: number,
	created_at?: string,
  updated_at?: string,
  is_liked?: boolean
}

export interface Repository {
  id: number,
  node_id: string,
  name: string,
  full_name: string,
  private: boolean,
  owner: User,
  stargazers_count: number,
  forks_count: number
}

export interface UserState {
  userDetail: User | null,
  userRepositories: Array<Repository>,
  userFollowers: Array<User>,
  userFollowing: Array<User>
  isLoading: boolean,
  error: string | null
}

const initialState: UserState = {
  userDetail: null,
  userRepositories: [],
  userFollowers: [],
  userFollowing: [],
  isLoading: false,
  error: null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload
    },
    setUserFollowers: (state, action) => {
      state.userFollowers = action.payload
      state.isLoading = false
    },
    setUserFollowing: (state, action) => {
      state.userFollowing = action.payload
      state.isLoading = false
    },
    setUserRepositories: (state, action) => {
      state.userRepositories = action.payload
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { startLoading, setUserDetail, setUserFollowers, setUserFollowing, setUserRepositories, setError } = slice.actions

export const getUserDetail = (username: string): AppThunk => (dispatch, getStates) => {
  const users: User[] = getStates().search.users
  const existedUser: User | undefined = users.find(user => user.login === username)
  if (existedUser) {
    dispatch(setUserDetail(existedUser))
  } else {
    UserApi.getUser(username)
      .then((data: User) => {
        dispatch(setUserDetail(data))
      })
      .catch((err: any) => {
        console.log(err)
        dispatch(setError(err?.message?.message))
      })
  }
}

export const getUserRepositories = (username: string): AppThunk => (dispatch) => {
  dispatch(startLoading())
  UserApi.getUserRepositories(username)
    .then((data: User) => {
      dispatch(setUserRepositories(data))
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const getUserFollowers = (username: string): AppThunk => (dispatch) => {
  dispatch(startLoading())
  UserApi.getUserFollowers(username)
    .then((data: User[]) => {
      let userPromises: Promise<any>[] = []
      let users: User[] = []
      if(data.length > 0) {
        data.forEach((user: User) => {
          users.push(user)
          userPromises.push(UserApi.getUser(user.login))
        })
        Promise.allSettled(userPromises)
          .then(results => {
            results.forEach((result, index) => {
              if (result.status === 'fulfilled') {
                const newUser = result.value
                users.splice(index, 1, newUser)
              } else {
                console.log('failed to fetch user detail: ' + data[index], result.reason)
              }
            })
            const markedLikedUsers = dispatch(markLikedUsers(users))
            dispatch(setUserFollowers(markedLikedUsers))
          })
      } else {
        dispatch(setUserFollowers([]))
      }
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const getUserFollowing = (username: string): AppThunk => (dispatch) => {
  dispatch(startLoading())
  UserApi.getUserFollowing(username)
    .then((data: User[]) => {
      let userPromises: Promise<any>[] = []
      let users: User[] = []
      if(data.length > 0) {
        data.forEach((user: User) => {
          users.push(user)
          userPromises.push(UserApi.getUser(user.login))
        })
        Promise.allSettled(userPromises)
          .then(results => {
            results.forEach((result, index) => {
              if (result.status === 'fulfilled') {
                const newUser = result.value
                users.splice(index, 1, newUser)
              } else {
                console.log('failed to fetch user detail ' + data[index], result.reason)
              }
            })
            
            const markedLikedUsers = dispatch(markLikedUsers(users))
            dispatch(setUserFollowing(markedLikedUsers))
          })
      } else {
        dispatch(setUserFollowing([]))
      }
    })
    .catch((err: any) => {
      console.log(err)
      dispatch(setError(err?.message))
    })
}

export const markLikedUsers = (users: User[]): AppThunk<User[]> => (dispatch, getStates) => {
  dispatch(getLikedUsers())
  const likedUsers = getStates().favourite.users
  const copiedUsers = JSON.parse(JSON.stringify(users)) // copy users array just in case it's redux state & immutable
  return copiedUsers.map(user => {
    const likedUser = likedUsers.find(likedUser => likedUser.login === user.login)
    if (likedUser)
      user.is_liked = true
    return user
  })
}

export default slice.reducer