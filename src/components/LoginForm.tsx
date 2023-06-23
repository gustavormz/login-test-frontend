interface IProps {
  password: string
  email: string
  handlePasswordChange: (event: any) => void
  handleEmailChange: (event: any) => void
  handleOnClick: () => void
}

const LoginForm = ({
  password,
  email,
  handlePasswordChange,
  handleOnClick,
  handleEmailChange,
}: IProps) => {
  return (
    <div>
      <h1>LOGIN</h1>
      <input placeholder="Email" onChange={handleEmailChange} value={email} />
      <input placeholder="Password" onChange={handlePasswordChange} value={password} type='password' />
      <button onClick={handleOnClick}>Login</button>
    </div>
  )
}

export default LoginForm

