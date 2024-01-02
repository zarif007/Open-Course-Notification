import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  PORT: process.env.PORT,
  database_url: process.env.DATABASE_URL,

  aiven_redis_host: process.env.AIVEN_REDIS_HOST,
  aiven_redis_post: process.env.AIVEN_REDIS_PORT,
  aiven_redis_username: process.env.AIVEN_REDIS_USERNAME,
  aiven_redis_password: process.env.AIVEN_REDIS_PASSWORD,

  Upstash_kafka_rest_url: process.env.UPSTASH_KAFKA_REST_URL as string,
  Upstash_kafka_rest_username: process.env
    .UPSTASH_KAFKA_REST_USERNAME as string,
  Upstash_kafka_rest_password: process.env
    .UPSTASH_KAFKA_REST_PASSWORD as string,
  Upstash_kafka_rest_brokers: process.env.UPSTASH_KAFKA_BROKERS as string,
  Upstash_kafka_rest_mechanism: process.env.UPSTASH_KAFKA_MECHANISM as string,
};
