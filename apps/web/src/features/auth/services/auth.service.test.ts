/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';

import { authService } from './auth.service';

const TEST_SECRET = 'test-secret-key';

beforeAll(() => {
  process.env.JWT_SECRET = TEST_SECRET;
  process.env.GITHUB_CLIENT_ID = 'test-client-id';
  process.env.GITHUB_CLIENT_SECRET = 'test-client-secret';
  process.env.ADMIN_GITHUB_ID = '12345';
});

jest.mock('@highjoon-dev/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const { prisma } = jest.requireMock('@highjoon-dev/prisma');

describe('authService', () => {
  describe('getGithubAuthUrl', () => {
    test('GitHub OAuth URL을 생성한다', () => {
      const result = authService.getGithubAuthUrl();

      expect(result.success).toBe(true);
      expect(result.data).toContain('https://github.com/login/oauth/authorize');
      expect(result.data).toContain('client_id=test-client-id');
      expect(result.data).toContain('scope=read%3Auser');
    });

    test('returnUrl이 있으면 state 파라미터로 추가한다', () => {
      const result = authService.getGithubAuthUrl('https://example.com/posts');

      expect(result.data).toContain('state=https');
    });

    test('returnUrl이 없으면 state 파라미터가 없다', () => {
      const result = authService.getGithubAuthUrl();

      expect(result.data).not.toContain('state=');
    });
  });

  describe('generateAccessToken', () => {
    const mockGithubUser = {
      id: 99999,
      login: 'testuser',
      name: 'Test User',
      html_url: 'https://github.com/testuser',
      avatar_url: 'https://avatars.githubusercontent.com/u/99999',
    };

    const mockDbUser = {
      id: 'db-user-1',
      githubId: 99999,
      name: 'Test User',
      homeUrl: 'https://github.com/testuser',
      avatarUrl: 'https://avatars.githubusercontent.com/u/99999',
      role: 'USER',
    };

    beforeEach(() => {
      jest.clearAllMocks();
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('유효한 code로 액세스 토큰을 생성한다', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ access_token: 'gh-token-123' }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockGithubUser),
        });
      prisma.user.findFirst.mockResolvedValue(mockDbUser);

      const result = await authService.generateAccessToken('valid-code');

      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('accessToken');
      expect(typeof result.data!.accessToken).toBe('string');
    });

    test('ADMIN_GITHUB_ID와 일치하면 ADMIN 역할로 생성한다', async () => {
      const adminGithubUser = { ...mockGithubUser, id: 12345 };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ access_token: 'gh-token-123' }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(adminGithubUser),
        });
      prisma.user.findFirst.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ ...mockDbUser, role: 'ADMIN' });

      const result = await authService.generateAccessToken('valid-code');

      expect(result.success).toBe(true);
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ role: 'ADMIN' }),
        }),
      );
    });

    test('GitHub access token 조회 실패 시 에러 응답을 반환한다', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({}),
      });

      const result = await authService.generateAccessToken('invalid-code');

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    test('기존 사용자가 있으면 새로 생성하지 않는다', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: () => Promise.resolve({ access_token: 'gh-token-123' }),
        })
        .mockResolvedValueOnce({
          json: () => Promise.resolve(mockGithubUser),
        });
      prisma.user.findFirst.mockResolvedValue(mockDbUser);

      await authService.generateAccessToken('valid-code');

      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });
});
