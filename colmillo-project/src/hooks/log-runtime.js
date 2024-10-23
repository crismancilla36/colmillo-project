import { logger } from '../logger.js'

export const logRuntime = async (context, next) => {

  const startTime = Date.now()

  // Run everything else (other hooks and service call)
  await next()

  console.log(`Running hook log-runtime on ${context.path}.${context.method}`)

  const duration = Date.now() - startTime
  logger.info(`Calling ${context.method} on ${context.path} took ${duration}ms`)

}