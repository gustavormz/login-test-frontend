import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Profile from '../components/Profile'
import Error from '../components/Error'
import Loader from '../components/Loader'

import { LOCAL_STORAGE_KEYS, PATHS } from '../constants'

import useProfile from '../hooks/useProfile'

const ProfileView = () => {
  const [token, setToken] = useState<string>('')
  const {
    error,
    profile,
    isRequesting,
  } = useProfile({ token })

  const navigate = useNavigate()

  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate])

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.token)
    if (!tokenFromLocalStorage) {
      navigateTo(PATHS['/login'])
      return
    }
    setToken(tokenFromLocalStorage)
  }, [navigateTo])


  const renderProfile = useCallback(() => {
    if (isRequesting) {
      return <Loader />
    }
    return <Profile {...profile} />
  }, [isRequesting, profile])

  return (
    <Error error={error?.message}>
      {renderProfile()}
    </Error>
  )
}

export default ProfileView
