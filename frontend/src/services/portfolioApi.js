import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'


export const getPortfolioItems = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/portfolio-items/`
    )

    return response.data
  } catch (error) {
    console.error(
      'Error fetching portfolio items:',
      error
    )

    throw error
  }
}