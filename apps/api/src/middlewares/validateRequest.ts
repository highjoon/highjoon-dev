import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodError, ZodSchema } from 'zod';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleServiceResponse } from '@/utils/httpHandlers';

export const validateRequest =
  (schemas: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        schemas.body.parse(req.body);
      }

      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      if (schemas.params) {
        schemas.params.parse(req.params);
      }

      next();
    } catch (err) {
      const errorMessage = (err as ZodError).errors.map((e) => `${e.path.join('.')} - ${e.message}`).join(', ');

      const statusCode = StatusCodes.BAD_REQUEST;
      const serviceResponse = ServiceResponse.failure(`Invalid input: ${errorMessage}`, null, statusCode);

      handleServiceResponse(serviceResponse, res);
    }
  };
