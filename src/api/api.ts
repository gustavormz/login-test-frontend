import { IProfile } from './models'

import { END_POINTS } from '../constants'

class API {
  private static baseApiUrl = process.env.REACT_APP_BASE_API_URL

  static async register(
    body: IProfile,
  ) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const endpoint = END_POINTS.register
    const url = `${this.baseApiUrl}/${endpoint}`
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
  }

  static async login(
    email: string,
    password: string
  ) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const endpoint = END_POINTS.login
    const url = `${this.baseApiUrl}/${endpoint}`
    const urlWithParams = new URL(url)

    urlWithParams.searchParams.append('email', email)
    urlWithParams.searchParams.append('password', password)

    return await fetch(urlWithParams.toString(), {
      method: 'POST',
      headers,
    })
  }

  static async profile(
    token: string,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    const endpoint = END_POINTS.profile
    const url = `${this.baseApiUrl}/${endpoint}`
    return await fetch(url, {
      method: 'GET',
      headers,
    })
  }
}

export default API
