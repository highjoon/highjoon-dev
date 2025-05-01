import { type Optional } from '@highjoon-dev/types';
import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { authService } from '@/services/auth/auth.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class AuthController {
  public authorizeGithub = async (req: Request, res: Response) => {
    const { returnUrl } = req.query;
    const url = authService.getGithubAuthUrl(returnUrl as Optional<string>);

    handleServiceResponse(url, res);
  };

  public authorizeGithubCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    if (typeof code !== 'string') {
      handleServiceResponse(ServiceResponse.failure('code가 없습니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const result = await authService.generateAccessToken(code as string);
    handleServiceResponse(result, res);
  };
}

export const authController = new AuthController();
