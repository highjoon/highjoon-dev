import { type Request, type Response } from 'express';

import { postService } from '@/services/post.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class PostController {
  public getPosts = async (req: Request, res: Response) => {
    const postsResponse = await postService.findAll();

    handleServiceResponse(postsResponse, res);
  };
}

export const postController = new PostController();
