import { type ServiceResponseInterface } from '@highjoon-dev/types';

/** Error 객체에서 ServiceResponse 추출 */
export const parseApiError = (error: Error): ServiceResponseInterface => {
  return JSON.parse(error.message) as ServiceResponseInterface;
};
