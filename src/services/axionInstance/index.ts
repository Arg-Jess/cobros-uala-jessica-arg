import axios, { AxiosInstance } from 'axios'

const createApi = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
  })
}

const api = createApi('https://uala-dev-challenge.s3.us-east-1.amazonaws.com')

export default api
