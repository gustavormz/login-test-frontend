import { useState, useEffect } from 'react'

import API from '../api/api'
import { IErrors } from '../api/models'

interface IProps {
  email: string
  password: string
  send: boolean
  name: string
}

const useRegister = ({
  email,
  password,
  name,
  send,
}: IProps) => {
  const [error, setError] = useState<IErrors>()
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (!send) {
      return
    }
    const register = async () => {
      try {
        setIsRequesting(true)
        const response = await API.register({
          email,
          name,
          password,
        })
        const customResponse = await response.json()
        const successResponse = customResponse.code === 201
        setSuccess(successResponse)

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
    register()
  }, [send, email, password, name])

  return {
    error,
    isRequesting,
    success,
  }
}

export default useRegister
