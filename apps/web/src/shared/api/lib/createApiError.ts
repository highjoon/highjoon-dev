import { type ServiceResponseInterface } from '@highjoon-dev/types';

/** ServiceResponse를 Error 객체로 변환 */
export function createApiError(serviceResponse: ServiceResponseInterface): Error {
  return new Error(JSON.stringify(serviceResponse));
}
