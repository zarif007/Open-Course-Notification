import { Kafka, Message, Producer, logLevel } from 'kafkajs';
import envConfig from '../../../config/envConfig';

// Kafka configuration for secured cluster
const kafka = new Kafka({
  brokers: [envConfig.Upstash_kafka_rest_brokers],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: envConfig.Upstash_kafka_rest_username,
    password: envConfig.Upstash_kafka_rest_password,
  },
  logLevel: logLevel.ERROR,
});

let producer: Producer | null = null;

export async function createProducer() {
  if (producer) return producer;
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export const produceNotification = async (notification: string) => {
  const producer = await createProducer();

  const message: Message = {
    key: `notification-${Date.now()}`,
    value: notification,
  };

  await producer.send({
    messages: [message],
    topic: 'NOTIFICATION',
  });

  return true;
};

export default kafka;
