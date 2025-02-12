import { Router } from 'express';

import PostController from '@/controllers/post.controller';

const router = Router();

router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPost);

export default router;
