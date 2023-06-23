import { useState, useEffect } from 'react'

import API from '../api/api'
import { IProfile, IErrors } from '../api/models'

interface IProps {
  token: string | null
}

const useProfile = ({
  token,
}: IProps) => {
  const [profile, setProfile] = useState<IProfile>({ email: '', name: '' })
  const [error, setError] = useState<IErrors>()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)

  useEffect(() => {
    if (!token) {
      return
    }
    const getProfile = async () => {
      try {
        setIsRequesting(true)
        const response = await API.profile(token)
        const customResponse = await response.json()
        const successResponse = customResponse.code === 200
        const dataResponse = customResponse.data
        setProfile({
          email: dataResponse.email,
          name: dataResponse.name,
        })
        if (!successResponse) {
          setError({
            code: customResponse.code,
            message: customResponse.message
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsRequesting(false)
      }
    }
    getProfile()
  }, [token])

  return {
    profile,
    error,
    isRequesting,
  }
}

export default useProfile
