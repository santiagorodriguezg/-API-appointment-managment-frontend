import { HttpClient } from '../../libs/HttpClient'

const api = HttpClient()

export const LoginService = async (data) => await api.post('login/', { body: data })

export const SignupService = async (data) => await api.post('signup/', { body: data })

export const PasswordResetService = async (data) => await api.post('password/reset/', { body: data })
