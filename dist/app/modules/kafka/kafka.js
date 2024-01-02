"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNotificationConsumer = exports.produceNotification = exports.createProducer = void 0;
/* eslint-disable no-console */
const kafkajs_1 = require("kafkajs");
const envConfig_1 = __importDefault(require("../../../config/envConfig"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Kafka configuration for secured cluster
const kafka = new kafkajs_1.Kafka({
    brokers: [envConfig_1.default.Upstash_kafka_rest_brokers],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: envConfig_1.default.Upstash_kafka_rest_username,
        password: envConfig_1.default.Upstash_kafka_rest_password,
    },
    logLevel: kafkajs_1.logLevel.ERROR,
});
let producer = null;
function createProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (producer)
            return producer;
        const _producer = kafka.producer();
        yield _producer.connect();
        producer = _producer;
        return producer;
    });
}
exports.createProducer = createProducer;
const produceNotification = (notification) => __awaiter(void 0, void 0, void 0, function* () {
    const producer = yield createProducer();
    const message = {
        key: `notification-${Date.now()}`,
        value: notification,
    };
    yield producer.send({
        messages: [message],
        topic: 'NOTIFICATION',
    });
    return true;
});
exports.produceNotification = produceNotification;
const startNotificationConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Consumer is running');
    const consumer = kafka.consumer({ groupId: 'default' });
    yield consumer.connect();
    yield consumer.subscribe({ topic: 'NOTIFICATION', fromBeginning: true });
    yield consumer.run({
        autoCommit: true,
        eachMessage: ({ message, pause }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (!message.value)
                return;
            const data = JSON.parse((_a = message.value) === null || _a === void 0 ? void 0 : _a.toString()).message;
            try {
                yield prisma_1.default.notification.create({
                    data,
                    include: {
                        category: true,
                    },
                });
            }
            catch (err) {
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: 'NOTIFICATION' }]);
                }, 60 * 1000);
            }
        }),
    });
});
exports.startNotificationConsumer = startNotificationConsumer;
exports.default = kafka;
