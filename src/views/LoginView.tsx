import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import Error from '../components/Error'
import Loader from '../components/Loader'

import useLogin from '../hooks/useLogin'

import { PATHS } from '../constants'

const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [send, setSend] = useState<boolean>(false)
  const [errors, setErrors] = useState('')

  const { error, isRequesting, success } = useLogin({
    email,
    password,
    send,
  })

  const navigate = useNavigate()

  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate])

  useEffect(() => {
    if (success) {
      navigateTo(PATHS['/profile'])
    }
  }, [success, navigateTo])

  useEffect(() => {
    setSend(false)
  }, [isRequesting])

  const handlePasswordChange = useCallback((event: any) => {
    setPassword(event.target.value)
  }, [])

  const handleEmailChange = useCallback((event: any) => {
    setEmail(event.target.value)
  }, [])

  const handleOnSubmit = useCallback(async () => {
    if (!email || !password) {
      setErrors('Please fill all fields')
      return
    }
    setSend(true)
  }, [email, password])

  const renderLogin = useCallback(() => {
    if (isRequesting) {
      return <Loader />
    }
    return (
      <LoginForm
        email={email}
        handleEmailChange={handleEmailChange}
        handleOnClick={handleOnSubmit}
        handlePasswordChange={handlePasswordChange}
        password={password}/>
    )
  }, [
    email, handleEmailChange, handleOnSubmit, handlePasswordChange, isRequesting, password
  ])

  const handleGoToRegister = useCallback(() => {
    window.location.pathname = PATHS['/register']
  }, [])

  return (
    <Error error={error?.message ?? errors}>
      {renderLogin()}
      <button onClick={handleGoToRegister}>Go to register</button>
    </Error>
  )
}

export default LoginView
