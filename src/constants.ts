const PATHS = {
  '/register': '/register',
  '/login': '/login',
  '/profile': '/profile',
}

const END_POINTS = {
  register: process.env.REACT_APP_REGISTER_ENDPOINT,
  login: process.env.REACT_APP_LOGIN_ENDPOINT,
  profile: process.env.REACT_APP_PROFILE_ENDPOINT,
}

const LOCAL_STORAGE_KEYS = {
  token: 'token',
}

export {
  PATHS,
  END_POINTS,
  LOCAL_STORAGE_KEYS,
}
