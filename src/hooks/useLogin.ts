import { useState, useEffect } from 'react'

import API from '../api/api'
import { IErrors } from '../api/models'

import { LOCAL_STORAGE_KEYS } from '../constants'

interface IProps {
  email: string
  password: string
  send: boolean
}

const useLogin = ({
  email,
  password,
  send,
}: IProps) => {
  const [error, setError] = useState<IErrors>()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (!send) {
      return
    }
    const login = async () => {
      try {
        setIsRequesting(true)
        const response = await API.login(email, password)
        const customResponse = await response.json()
        const successResponse = customResponse.code === 200
        setSuccess(successResponse)
        if (!successResponse) {
          setError({
            code: customResponse.code,
            message: customResponse.message
          })
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEYS.token, customResponse.data.token)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsRequesting(false)
      }
    }
    login()
  }, [send, email, password])

  return {
    error,
    isRequesting,
    success,
  }
}

export default useLogin
