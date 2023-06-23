import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import RegistrationForm from '../components/RegistrationForm'
import Error from '../components/Error'
import Loader from '../components/Loader'

import useRegister from '../hooks/useRegister'

import { PATHS } from '../constants'

import { validateEmail } from '../utils';

const RegisterView = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [send, setSend] = useState<boolean>(false)
  const [errors, setErrors] = useState('')

  const {
    error,
    isRequesting,
    success,
  } = useRegister({
    email,
    name,
    password,
    send,
  })

  const navigate = useNavigate()

  const navigateTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate])

  useEffect(() => {
    if (success) {
      navigateTo(PATHS['/login'])
    }
  }, [navigateTo, success])

  useEffect(() => {
    setSend(false)
  }, [isRequesting])

  const handleNameChange = useCallback((event: any) => {
    setName(event.target.value)
  }, [])

  const handlePasswordChange = useCallback((event: any) => {
    setPassword(event.target.value)
  }, [])

  const handleEmailChange = useCallback((event: any) => {
    setEmail(event.target.value)
  }, [])

  const handleOnSubmit = useCallback(async () => {
    if (!email || !name || !password) {
      setErrors('Please fill all fields')
      return
    }
    if (!validateEmail(email)) {
      setErrors('Type a valid email')
      return
    }
    setSend(true)
  }, [email, name, password])

  const renderProfile = useCallback(() => {
    if (isRequesting) {
      return <Loader />
    }
    return (
      <RegistrationForm
        email={email}
        handleEmailChange={handleEmailChange}
        handleNameChange={handleNameChange}
        handleOnClick={handleOnSubmit}
        handlePasswordChange={handlePasswordChange}
        name={name}
        password={password}/>
    )
  }, [
    email,
    handleEmailChange,
    handleNameChange,
    handleOnSubmit,
    handlePasswordChange,
    isRequesting,
    name,
    password
  ])

  const handleGoToLogin = useCallback(() => {
    window.location.pathname = PATHS['/login']
  }, [])

  return (
    <Error error={error?.message ?? errors}>
      {renderProfile()}
      <button onClick={handleGoToLogin}>Go to login</button>
    </Error>
  )
}

export default RegisterView
