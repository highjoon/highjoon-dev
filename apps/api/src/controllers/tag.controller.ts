import { type Request, type Response } from 'express';

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
}

export const tagController = new TagController();
