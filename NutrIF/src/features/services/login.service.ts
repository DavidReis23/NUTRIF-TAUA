import { http } from "../../infra/http/http-client"
import { clearAccessToken, setAccessToken } from "../storage/token.storage"

export async function LoginUser(email: string, password: string): Promise<any> {
  const responseData = await http.post<any>('auth/login', {
    email,
    password,
  })
  setAccessToken(responseData.token)
  return responseData
}

export function Logout(): void{
  clearAccessToken()
}