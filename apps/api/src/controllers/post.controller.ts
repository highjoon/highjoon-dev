import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { postService } from '@/services/post/post.service';
import { postLikeService } from '@/services/post/postLike.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class PostController {
  public getAllPosts = async (req: Request, res: Response) => {
    const postsResponse = await postService.findAllPosts();

    handleServiceResponse(postsResponse, res);
  };

  public getPost = async (req: Request, res: Response) => {
    const slug = req.params.slug;

    if (!slug) {
      handleServiceResponse(ServiceResponse.failure('유효하지 않은 게시물입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const postsResponse = await postService.findPost(slug);

    handleServiceResponse(postsResponse, res);
  };

  public getFeaturedPost = async (req: Request, res: Response) => {
    const postResponse = await postService.findFeaturedPost();

    handleServiceResponse(postResponse, res);
  };

  public createPost = async (req: Request, res: Response) => {
    const postResponse = await postService.createPost(req.body);

    handleServiceResponse(postResponse, res);
  };

  public createManyPosts = async (req: Request, res: Response) => {
    const postsResponse = await postService.createManyPosts(req.body);

    handleServiceResponse(postsResponse, res);
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

  public increaseViewCount = async (req: Request, res: Response) => {
    const slug = req.params.slug;

    if (!slug) {
      handleServiceResponse(ServiceResponse.failure('유효하지 않은 게시물입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || req.ip || '';
    const response = await postService.increaseViewCount(slug, ip);

    handleServiceResponse(response, res);
  };

  public async likePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!postId) {
      handleServiceResponse(ServiceResponse.failure('유효하지 않은 게시물입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    if (!userId) {
      handleServiceResponse(ServiceResponse.failure('유효하지 않은 사용자입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const response = await postLikeService.likePost(userId, postId);

    handleServiceResponse(response, res);
  }
}

export const postController = new PostController();
