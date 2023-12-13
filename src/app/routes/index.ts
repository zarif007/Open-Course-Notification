import { Router } from 'express';
import { discussionRoute } from '../modules/discussion/dicussion.route';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moduleRoutes = [
  {
    path: '/discussion',
    route: discussionRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
