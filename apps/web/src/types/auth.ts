export interface AuthApiRequest {
  githubLogin: { returnUrl: string };
  githubLoginCallback: { code: string };
}
