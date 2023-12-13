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
exports.DiscussionService = void 0;
// import { IDiscussion } from '../../../interfaces/discussion.interface';
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.discussion.findMany({});
    return result;
});
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data)
        return null;
    const result = yield prisma_1.default.discussion.create({
        data,
    });
    // eslint-disable-next-line no-console
    console.log(data);
    return result;
});
exports.DiscussionService = {
    insertIntoDB,
    getFromDB,
};
