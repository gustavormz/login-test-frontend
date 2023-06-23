import { ReactNode } from 'react'

interface IProps {
  error?: string,
  children: ReactNode
}

const Error = ({
  children,
  error 
}: IProps) => (
  <div>
    <div>
      <h1>
        {error ?? 'ERROR'}
      </h1>
    </div>
    <div>
      {children}
    </div>
  </div>
)

export default Error
