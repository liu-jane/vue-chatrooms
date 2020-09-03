const WXUSERINFO = 'ws_user_info'
import Cookies from 'js-cookie'
export function getUserInfo() {
  if(Cookies.get(WXUSERINFO)) {
    return JSON.parse(Cookies.get(WXUSERINFO))
  }else {
    return null
  }
}

export function setUserInfo(user) {
  return Cookies.set(WXUSERINFO, JSON.stringify(user), { expires: new Date().getHours() + (24 * 7), path: '/' })
}

export function removeUserInfo() {
  return Cookies.remove(WXUSERINFO)
}