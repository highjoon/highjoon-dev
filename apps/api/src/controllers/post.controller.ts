import { type Request, type Response } from 'express';

import { postService } from '@/services/post/post.service';
import { postLikeService } from '@/services/post/postLike.service';
import { extractIp } from '@/utils/extractIp';
import { handleServiceResponse } from '@/utils/httpHandlers';

class PostController {
  public getAllPosts = async (req: Request, res: Response) => {
    const { skip, take, limit } = req.query;

    const postsResponse = await postService.findAllPosts({
      skip: skip ? Number(skip) : undefined,
      take: limit ? Number(limit) : take ? Number(take) : undefined,
    });

    handleServiceResponse(postsResponse, res);
  };

  public getPost = async (req: Request, res: Response) => {
    const slug = req.params.slug;
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
    const { id } = req.params;
    const data = req.body;

    const postResponse = await postService.updatePost({ id, data });

    handleServiceResponse(postResponse, res);
  };

  public increaseViewCount = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const ip = extractIp(req);

    const response = await postService.increaseViewCount(slug, ip);

    handleServiceResponse(response, res);
  };

  public async likePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { userId } = req.body;

    const response = await postLikeService.likePost(userId, postId);

    handleServiceResponse(response, res);
  }

  public async unlikePost(req: Request, res: Response) {
    const { postId } = req.params;
    const { userId } = req.body;

    const response = await postLikeService.unlikePost(userId, postId);

    handleServiceResponse(response, res);
  }
}

export const postController = new PostController();
