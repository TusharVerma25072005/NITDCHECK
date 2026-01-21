import {Queue , Worker} from 'bullmq'

import IOredis from 'ioredis';

export const redis = new IOredis(process.env.REDIS_URL! , {
  maxRetriesPerRequest: null,
})

export const imageQueue = new Queue("image-processing", { connection: redis });

