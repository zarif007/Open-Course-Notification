import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

router.get('/:userId', NotificationController.getAllFromDB);
// router.post('/', NotificationController.insertIntoDB);
router.patch('/makeAllRead/:userId', NotificationController.makeAllRead);

export const notificationRoutes = router;
