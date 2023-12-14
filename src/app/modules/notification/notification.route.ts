import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/', NotificationController.getAllFromDB);
router.post('/', NotificationController.insertIntoDB);

export const notificationRoutes = router;
