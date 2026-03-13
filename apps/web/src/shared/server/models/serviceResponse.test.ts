import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from './serviceResponse';

describe('ServiceResponse', () => {
  describe('success', () => {
    test('기본 상태 코드는 200이다', () => {
      const response = ServiceResponse.success('성공', { id: '1' });

      expect(response.success).toBe(true);
      expect(response.message).toBe('성공');
      expect(response.data).toEqual({ id: '1' });
      expect(response.statusCode).toBe(StatusCodes.OK);
    });

    test('커스텀 상태 코드를 지정할 수 있다', () => {
      const response = ServiceResponse.success('생성됨', null, StatusCodes.CREATED);

      expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe('failure', () => {
    test('기본 상태 코드는 400이다', () => {
      const response = ServiceResponse.failure('실패', null);

      expect(response.success).toBe(false);
      expect(response.message).toBe('실패');
      expect(response.data).toBeNull();
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    test('커스텀 상태 코드를 지정할 수 있다', () => {
      const response = ServiceResponse.failure('인증 실패', null, StatusCodes.UNAUTHORIZED);

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
});
