"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discussionRoute = void 0;
const express_1 = __importDefault(require("express"));
const discussion_controller_1 = require("./discussion.controller");
const router = express_1.default.Router();
router.get('/', discussion_controller_1.DiscussionController.getFromDB);
router.post('/', discussion_controller_1.DiscussionController.insertIntoDB);
exports.discussionRoute = router;
