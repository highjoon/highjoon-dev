import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { authService } from '@/services/auth/auth.service';
import { env } from '@/utils/env';
import { handleServiceResponse } from '@/utils/httpHandlers';

class AuthController {
  public authorizeGithub = async (req: Request, res: Response) => {
    const returnUrl = req.body.returnUrl;
    const url = authService.getGithubAuthUrl(returnUrl);

    handleServiceResponse(url, res);
  };

  public authorizeGithubCallback = async (req: Request, res: Response) => {
    const { code } = req.query;

    const config = {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code as string,
    };

    const accessTokenUrl = new URL('https://github.com/login/oauth/access_token');
    accessTokenUrl.search = new URLSearchParams(config).toString();

    try {
      const result = await authService.generateAccessToken(code as string);
      handleServiceResponse(ServiceResponse.success('성공했습니다', result), res);
    } catch (error) {
      handleServiceResponse(ServiceResponse.failure('실패했습니다', error, StatusCodes.INTERNAL_SERVER_ERROR), res);
    }
  };
}

export const authController = new AuthController();
