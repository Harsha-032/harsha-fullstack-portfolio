import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'


export const getPortfolioItems = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/portfolio-items/?page=${page}`
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

export const getTechStack = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tech-stack/`
    )

    return response.data
  } catch (error) {
    console.error(
      'Error fetching tech stack:',
      error
    )

    throw error
  }
}
