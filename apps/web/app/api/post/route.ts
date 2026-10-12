import { type NextRequest, NextResponse } from 'next/server';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';

const toNumber = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  return Number(value);
};

export const GET = async (request: NextRequest) => {
  const skip = request.nextUrl.searchParams.get('skip');
  const take = request.nextUrl.searchParams.get('take');
  const limit = request.nextUrl.searchParams.get('limit');

  const data = await getAllPostsApi({
    skip: toNumber(skip),
    take: toNumber(limit) ?? toNumber(take),
  });

  return NextResponse.json({ data });
};
