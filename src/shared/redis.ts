import Redis from 'ioredis';
import envConfig from '../config/envConfig';

export const connectToRedis = () => {
  const redis = new Redis({
    host: envConfig.aiven_redis_host as string,
    port: parseInt(envConfig.aiven_redis_post as string),
    username: envConfig.aiven_redis_username as string,
    password: envConfig.aiven_redis_password as string,
  });

  return redis;
};
