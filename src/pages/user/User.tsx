import React from 'react'
import { setTitle, setHasMenu } from '../../layouts/app-layout/app-layout.store'
import { useAppDispatch } from '../../redux/hooks'

export default function User(): JSX.Element {

  // local states

  // redux states

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(setTitle(''))
    dispatch(setHasMenu(false))  
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      user
    </div>
  )
}