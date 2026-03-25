const KEY_TOKEN = 'token'

function setAccessToken(token: string){
  localStorage.setItem(KEY_TOKEN, token)
}

function getAccessToken(){
  return localStorage.getItem(KEY_TOKEN)
}

function clearAccessToken(){
  localStorage.removeItem(KEY_TOKEN)
}

export {
  setAccessToken,
  getAccessToken,
  clearAccessToken
}