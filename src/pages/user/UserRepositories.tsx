import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserRepositories } from './user.store'

export default function User(): JSX.Element {
  const params = useParams()

  // local states

  // redux states
  const { userRepositories, isLoading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if(params.username) {
      dispatch(getUserRepositories(params.username))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      user
    </div>
  )
}