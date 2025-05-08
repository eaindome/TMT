const redisClient = require("../config/redis");
const { promisify } = require("util");

// Convert Redis callback methods to promises
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

/**
 * Cache service for Redis-based caching
 */
class CacheService {
  /**
   * Get data from cache
   * @param {string} key - Cache key
   * @returns {Promise<Object|null>} - Cached data or null if not found
   */
  async get(key) {
    try {
      const data = await getAsync(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Redis GET error:", error);
      return null;
    }
  }

  /**
   * Set data in cache
   * @param {string} key - Cache key
   * @param {Object} value - Data to cache
   * @param {number} expireTime - Expiration time in seconds
   * @returns {Promise<boolean>} - True if successful
   */
  async set(key, value, expireTime = 3600) {
    try {
      await setAsync(key, JSON.stringify(value), "EX", expireTime);
      return true;
    } catch (error) {
      console.error("Redis SET error:", error);
      return false;
    }
  }

  /**
   * Delete data from cache
   * @param {string} key - Cache key
   * @returns {Promise<boolean>} - True if successful
   */
  async del(key) {
    try {
      await delAsync(key);
      return true;
    } catch (error) {
      console.error("Redis DEL error:", error);
      return false;
    }
  }

  /**
   * Generate a cache key with standardized format
   * @param {string} prefix - Key prefix (e.g., 'pharmacy')
   * @param {Object} params - Parameters for the key
   * @returns {string} - Formatted cache key
   */
  generateKey(prefix, params) {
    const sortedParams = Object.entries(params)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}:${value}`)
      .join("_");

    return `${prefix}_${sortedParams}`;
  }
}

module.exports = new CacheService();
