import type { Response } from 'express';

import { type ServiceResponse } from '@/models/servicesResponse';

export const handleServiceResponse = <T>(serviceResponse: ServiceResponse<T>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};
