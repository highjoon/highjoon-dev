import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface GithubLoginCallbackRequestDto {
  code: string;
}

export interface GithubLoginCallbackResponseDto {
  accessToken: string;
}

export type GithubLoginCallbackApiResponseDto = ServiceResponseInterface<GithubLoginCallbackResponseDto>;
