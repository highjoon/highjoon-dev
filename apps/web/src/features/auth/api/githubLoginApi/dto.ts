import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface GithubLoginRequestDto {
  returnUrl: string;
}

export type GithubLoginResponseDto = ServiceResponseInterface<string>;
