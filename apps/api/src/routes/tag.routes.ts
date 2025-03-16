import express, { type Router } from 'express';

import { tagController } from '@/controllers/tag.controller';

export const tagRoutes: Router = express.Router();

tagRoutes.get('/', tagController.getAllTags);
