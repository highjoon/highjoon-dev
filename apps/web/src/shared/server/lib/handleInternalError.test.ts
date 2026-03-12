import { StatusCodes } from 'http-status-codes';

import { handleInternalError } from './handleInternalError';

describe('handleInternalError', () => {
  test('500 상태 코드와 실패 응답을 반환한다', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = handleInternalError(new Error('DB 연결 실패'), 'findUser Error');

    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.message).toBe('서버 내부 오류가 발생했습니다.');

    consoleSpy.mockRestore();
  });

  test('에러 메시지를 console.error로 출력한다', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    handleInternalError(new Error('타임아웃'), 'API 호출 실패');

    expect(consoleSpy).toHaveBeenCalledWith('API 호출 실패: 타임아웃');

    consoleSpy.mockRestore();
  });
});
