import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { userService } from '@/services/user/user.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class UserController {
  public getLikedPostsByUserId = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      handleServiceResponse(
        ServiceResponse.failure('유효하지 않은 사용자 ID입니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const postsResponse = await userService.findLikedPostsByUserId(userId);

    handleServiceResponse(postsResponse, res);
  };
}

export const userController = new UserController();
