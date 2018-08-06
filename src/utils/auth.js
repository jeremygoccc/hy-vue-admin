import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserIdKey = 'Admin-Id'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function delToken () {
  return Cookies.remove(TokenKey)
}

export function getUserId () {
  return Cookies.set(UserIdKey)
}

export function setUserId (userId) {
  return Cookies.set(UserIdKey, userId)
}

export function delUserId () {
  return Cookies.remove(UserIdKey)
}
