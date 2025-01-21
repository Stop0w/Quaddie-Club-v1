const CACHE_PREFIX = 'quaddie-club-'
const CACHE_EXPIRY = 30 * 60 * 1000 // 30 minutes

export const cacheManager = {
  async set(key, data, expiry = CACHE_EXPIRY) {
    const cacheKey = `${CACHE_PREFIX}${key}`
    const cacheData = {
      data,
      timestamp: Date.now(),
      expiry
    }
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      return true
    } catch (error) {
      console.error('Cache write failed:', error)
      return false
    }
  },

  get(key) {
    const cacheKey = `${CACHE_PREFIX}${key}`
    
    try {
      const cached = localStorage.getItem(cacheKey)
      if (!cached) return null

      const { data, timestamp, expiry } = JSON.parse(cached)
      
      if (Date.now() - timestamp > expiry) {
        localStorage.removeItem(cacheKey)
        return null
      }

      return data
    } catch (error) {
      console.error('Cache read failed:', error)
      return null
    }
  },

  remove(key) {
    const cacheKey = `${CACHE_PREFIX}${key}`
    localStorage.removeItem(cacheKey)
  },

  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key))
  }
}
