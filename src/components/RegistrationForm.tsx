interface IProps {
  name: string
  password: string
  email: string
  handleNameChange: (event: any) => void
  handlePasswordChange: (event: any) => void
  handleEmailChange: (event: any) => void
  handleOnClick: () => void
}

const RegistrationForm = ({
  name,
  password,
  email,
  handlePasswordChange,
  handleNameChange,
  handleOnClick,
  handleEmailChange,
}: IProps) => {
  return (
    <div>
      <h1>REGISTER</h1>
      <input placeholder="Name" onChange={handleNameChange} value={name} />
      <input placeholder="Email" onChange={handleEmailChange} value={email} />
      <input placeholder="Password" onChange={handlePasswordChange} value={password} type='password' />
      <button onClick={handleOnClick}>Send</button>
    </div>
  )
}

export default RegistrationForm

