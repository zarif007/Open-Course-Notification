"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
router.get('/:userId', notification_controller_1.NotificationController.getAllFromDB);
// router.post('/', NotificationController.insertIntoDB);
router.patch('/makeAllRead/:userId', notification_controller_1.NotificationController.makeAllRead);
exports.notificationRoutes = router;
