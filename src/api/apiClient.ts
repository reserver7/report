// src/api/apiClient.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://coding-test.adpopcorn.com/api/v1/report/demo',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
