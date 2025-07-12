import { TokenData } from '@highjoon-dev/types';
import jwt from 'jsonwebtoken';

export const decodeToken = (token: string) => {
  const data = jwt.decode(token) as TokenData;

  return data;
};
