import { type Request, type Response } from 'express';

import { tagService } from '@/services/tag/tag.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class TagController {
  public getAllTags = async (req: Request, res: Response) => {
    const tagsResponse = await tagService.findAllTags();

    handleServiceResponse(tagsResponse, res);
  };
}

export const tagController = new TagController();
