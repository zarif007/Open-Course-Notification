import express from 'express';
import { DiscussionController } from './discussion.controller';

const router = express.Router();

router.get('/', DiscussionController.getFromDB);
router.post('/', DiscussionController.insertIntoDB);

export const discussionRoute = router;
