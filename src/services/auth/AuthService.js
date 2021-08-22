import { HttpClient } from '../../libs/HttpClient'

const api = HttpClient()

export const LoginService = async (data) => await api.post('v1/login/', { body: data })
