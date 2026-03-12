import { NextResponse } from 'next/server';

import { type ServiceResponse } from '@/shared/server/models/serviceResponse';

export const handleServiceResponse = <T>(serviceResponse: ServiceResponse<T>) => {
  return NextResponse.json(serviceResponse, { status: serviceResponse.statusCode });
};
