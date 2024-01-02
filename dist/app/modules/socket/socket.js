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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const socket_io_1 = require("socket.io");
const redis_1 = require("../../../shared/redis");
const kafka_1 = require("../kafka/kafka");
const pub = (0, redis_1.connectToRedis)();
const sub = (0, redis_1.connectToRedis)();
class SocketService {
    constructor() {
        console.log('Socket Server');
        this._io = new socket_io_1.Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            },
        });
    }
    initListeners() {
        const io = this._io;
        io.on('connect', socket => {
            const userId = socket.handshake.query.userId;
            const userChannel = `USER:${userId}`;
            sub.subscribe(userChannel);
            socket.join(userChannel);
            socket.on('event: postNotification', ({ message, receiver, }) => __awaiter(this, void 0, void 0, function* () {
                const recChannel = `USER:${receiver}`;
                yield pub.publish(recChannel, JSON.stringify({ message }));
            }));
            socket.on('disconnect', () => {
                sub.unsubscribe(userChannel);
            });
        });
        sub.on('message', (channel, notification) => __awaiter(this, void 0, void 0, function* () {
            io.to(channel).emit('message', notification);
            yield (0, kafka_1.produceNotification)(notification);
            console.log('from kafka broker');
        }));
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
