/* eslint-disable no-console */
import { Kafka, Message, Producer } from 'kafkajs';
import envConfig from '../../../config/envConfig';
import prisma from '../../../shared/prisma';

// Kafka configuration for secured cluster
const kafka = new Kafka({
  brokers: [envConfig.Upstash_kafka_rest_brokers],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: envConfig.Upstash_kafka_rest_username,
    password: envConfig.Upstash_kafka_rest_password,
  },
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

export const startNotificationConsumer = async () => {
  console.log('Consumer is running');
  const consumer = kafka.consumer({ groupId: 'default' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'NOTIFICATION', fromBeginning: true });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ message, pause }) => {
      if (!message.value) return;

      try {
        const data = JSON.parse(message.value.toString()).message;
        const res = await prisma.notification.create({
          data,
          include: {
            category: true,
          },
        });
        console.log(res);
      } catch (err) {
        console.error(err);
        pause();
        setTimeout(() => {
          consumer.resume([{ topic: 'NOTIFICATION' }]);
        }, 60 * 1000);
      }
    },
  });
};

export default kafka;
