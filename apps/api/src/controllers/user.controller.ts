import { type Request, type Response } from 'express';

import { userService } from '@/services/user/user.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class UserController {
  public getLikedPostsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const postsResponse = await userService.findLikedPostsByUserId(userId);

    handleServiceResponse(postsResponse, res);
  };
}

export const userController = new UserController();
