interface IProfile {
  name: string,
  email: string
  password?: string
}

interface IErrors {
  code: string
  message: string
}

export type { IProfile, IErrors }
