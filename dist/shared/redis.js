"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const envConfig_1 = __importDefault(require("../config/envConfig"));
const connectToRedis = () => {
    const redis = new ioredis_1.default({
        host: envConfig_1.default.aiven_redis_host,
        port: parseInt(envConfig_1.default.aiven_redis_post),
        username: envConfig_1.default.aiven_redis_username,
        password: envConfig_1.default.aiven_redis_password,
    });
    return redis;
};
exports.connectToRedis = connectToRedis;
