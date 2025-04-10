import { Redis } from "@upstash/redis"

// Create a Redis client using environment variables
let redisClient: Redis | null = null

export const getRedisClient = () => {
  if (!redisClient) {
    // Check if we're using Vercel KV (Upstash) environment variables
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      redisClient = Redis.fromEnv()
    } else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      // Fallback to direct Upstash environment variables
      redisClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    } else {
      throw new Error("Missing Redis environment variables")
    }
  }

  return redisClient
}

// Helper functions for Redis operations
export const setSessionQueue = async (sessionId: string, queue: string[]) => {
  const redis = getRedisClient()
  return redis.set(`session:${sessionId}:queue`, JSON.stringify(queue))
}

export const getSessionQueue = async (sessionId: string): Promise<string[]> => {
  const redis = getRedisClient()
  const queue = await redis.get<string>(`session:${sessionId}:queue`)
  return queue ? JSON.parse(queue) : []
}

export const addToSessionQueue = async (sessionId: string, submissionId: string, isPriority: boolean) => {
  const redis = getRedisClient()
  const queueKey = `session:${sessionId}:queue`

  // Get current queue
  const currentQueue = await redis.get<string>(queueKey)
  const queue = currentQueue ? JSON.parse(currentQueue) : []

  // If priority, add to the beginning of the queue (after other priorities)
  if (isPriority) {
    // Find the last priority submission
    let lastPriorityIndex = -1
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].startsWith("priority:")) {
        lastPriorityIndex = i
      } else {
        break // Assuming priorities are all at the beginning
      }
    }

    // Insert after the last priority or at the beginning
    queue.splice(lastPriorityIndex + 1, 0, `priority:${submissionId}`)
  } else {
    // Add to the end for standard submissions
    queue.push(submissionId)
  }

  // Save updated queue
  return redis.set(queueKey, JSON.stringify(queue))
}

export const removeFromSessionQueue = async (sessionId: string, submissionId: string) => {
  const redis = getRedisClient()
  const queueKey = `session:${sessionId}:queue`

  // Get current queue
  const currentQueue = await redis.get<string>(queueKey)
  if (!currentQueue) return

  const queue = JSON.parse(currentQueue)

  // Remove the submission (check both normal and priority format)
  const updatedQueue = queue.filter((id: string) => id !== submissionId && id !== `priority:${submissionId}`)

  // Save updated queue
  return redis.set(queueKey, JSON.stringify(updatedQueue))
}

export const updateSessionLiveStatus = async (sessionId: string, isLive: boolean) => {
  const redis = getRedisClient()
  return redis.set(`session:${sessionId}:live`, isLive)
}

export const getSessionLiveStatus = async (sessionId: string): Promise<boolean> => {
  const redis = getRedisClient()
  return redis.get<boolean>(`session:${sessionId}:live`) || false
}

export const incrementSessionViewCount = async (sessionId: string) => {
  const redis = getRedisClient()
  return redis.incr(`session:${sessionId}:views`)
}

export const getSessionViewCount = async (sessionId: string): Promise<number> => {
  const redis = getRedisClient()
  return redis.get<number>(`session:${sessionId}:views`) || 0
}
