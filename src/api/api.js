import axios from 'axios'

axios.defaults.baseURL = 'https://6446a8ee0431e885f0188e77.mockapi.io'

export default async function fetchUsers() {
  try {
    const response = await axios.get('/users')

    return response.data
  } catch (error) {
    console.log(error)
  }
}
