import { type Request, type Response } from 'express';

import { postTagService } from '@/services/tag/postTag.service';
import { tagService } from '@/services/tag/tag.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class TagController {
  public getAllTags = async (req: Request, res: Response) => {
    const response = await tagService.findAllTags();
    handleServiceResponse(response, res);
  };

  public getTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await tagService.findTag(id);
    handleServiceResponse(response, res);
  };

  public createTag = async (req: Request, res: Response) => {
    const response = await tagService.createTag(req.body);
    handleServiceResponse(response, res);
  };

  public updateTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await tagService.updateTag(id, req.body);
    handleServiceResponse(response, res);
  };

  public deleteTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await tagService.deleteTag(id);
    handleServiceResponse(response, res);
  };

  public getPostsByTag = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { skip = '0', take = '9' } = req.query;

    const response = await postTagService.findPostsByTag(id, {
      skip: parseInt(skip as string, 10),
      take: parseInt(take as string, 10),
    });

    handleServiceResponse(response, res);
  };
}

export const tagController = new TagController();
