import { Router } from 'express';
import { notificationRoutes } from '../modules/notification/notification.route';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moduleRoutes = [
  {
    path: '/notification',
    route: notificationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
