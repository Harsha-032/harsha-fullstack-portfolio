import axios from 'axios'

const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api'
)

/**
 * Fetch the user profile (latest).
 */
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/`)
    return response.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

/**
 * Fetch the work experiences list.
 */
export const getExperiences = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/experiences/`)
    return response.data
  } catch (error) {
    console.error('Error fetching experiences:', error)
    throw error
  }
}

/**
 * Fetch the active social links list.
 */
export const getSocialLinks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/social-links/`)
    return response.data
  } catch (error) {
    console.error('Error fetching social links:', error)
    throw error
  }
}

/**
 * Fetch paginated portfolio items with query params.
 */
export const getPortfolioItems = async ({
  page = 1,
  search = '',
  featured = null,
  ordering = '',
} = {}) => {
  try {
    const params = new URLSearchParams()
    if (page) params.append('page', page)
    if (search) params.append('search', search)
    if (featured !== null) params.append('featured', featured)
    if (ordering) params.append('ordering', ordering)

    const response = await axios.get(
      `${BASE_URL}/portfolio-items/?${params.toString()}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    throw error
  }
}

/**
 * Fetch a single portfolio item by its slug.
 */
export const getPortfolioItemBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/portfolio-items/${slug}/`
    )
    return response.data
  } catch (error) {
    console.error(`Error fetching portfolio item slug ${slug}:`, error)
    throw error
  }
}

/**
 * Fetch tech stack skills with optional filters.
 */
export const getTechStack = async ({
  category = '',
  search = '',
  ordering = '',
} = {}) => {
  try {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (search) params.append('search', search)
    if (ordering) params.append('ordering', ordering)

    const response = await axios.get(
      `${BASE_URL}/tech-stack/?${params.toString()}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching tech stack:', error)
    throw error
  }
}
