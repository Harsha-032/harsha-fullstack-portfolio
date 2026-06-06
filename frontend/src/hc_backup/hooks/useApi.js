import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * A custom hook to manage loading, error, and data states for async API calls.
 * 
 * @param {Function} apiFunc The asynchronous API client function to invoke.
 * @param {boolean} immediate Whether to run the API call automatically on mount.
 * @param {any} initialData The initial value for the data state.
 * @returns {object} { data, loading, error, execute, setData }
 */
export const useApi = (apiFunc, immediate = true, initialData = null) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  // Use a Ref to store the latest apiFunc, preventing infinite dependency loops
  const apiFuncRef = useRef(apiFunc)
  useEffect(() => {
    apiFuncRef.current = apiFunc
  })

  // Reusable callback for triggering manual requests or searches
  const execute = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiFuncRef.current(...args)
        setData(response)
        return response
      } catch (err) {
        console.error('API Hook Error:', err)
        setError(
          err.response?.data?.detail ||
          err.message ||
          'Something went wrong while fetching data.'
        )
        throw err
      } finally {
        setLoading(false)
      }
    },
    [] // Stable reference
  )

  // Manage automatic fetching on mount/change with cleanup protection
  useEffect(() => {
    let active = true

    if (immediate) {
      const fetchData = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await apiFuncRef.current()
          if (active) {
            setData(response)
          }
        } catch (err) {
          if (active) {
            console.error('API Hook Error during init:', err)
            setError(
              err.response?.data?.detail ||
              err.message ||
              'Something went wrong while fetching data.'
            )
          }
        } finally {
          if (active) {
            setLoading(false)
          }
        }
      }
      
      fetchData()
    }

    return () => {
      active = false
    }
  }, [immediate]) // Stable dependency

  return {
    data,
    loading,
    error,
    execute,
    setData,
  }
}

