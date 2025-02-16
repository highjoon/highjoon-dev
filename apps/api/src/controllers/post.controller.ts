import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { postService } from '@/services/post.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class PostController {
  public getAllPosts = async (req: Request, res: Response) => {
    const postsResponse = await postService.findAllPosts();

    handleServiceResponse(postsResponse, res);
  };

  public getPost = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      handleServiceResponse(
        ServiceResponse.failure('유효하지 않은 게시물 ID입니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const postsResponse = await postService.findPost(id);

    handleServiceResponse(postsResponse, res);
  };

  public createPost = async (req: Request, res: Response) => {
    const postResponse = await postService.createPost(req.body);

    handleServiceResponse(postResponse, res);
  };

  public updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
      handleServiceResponse(
        ServiceResponse.failure('유효하지 않은 게시물 ID입니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const data = req.body;

    if (!data) {
      handleServiceResponse(ServiceResponse.failure('유효하지 않은 데이터입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const postResponse = await postService.updatePost({ id, data });

    handleServiceResponse(postResponse, res);
  };
}

export const postController = new PostController();
