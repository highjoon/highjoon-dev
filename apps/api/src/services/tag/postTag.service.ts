import { type Post, prisma, type Tag } from '@highjoon-dev/prisma';
import { type Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';

class PostTagService {
  async syncPostTags(postId: string, tagIds: string[]): Promise<void> {
    await prisma.$transaction([
      prisma.postTag.deleteMany({ where: { postId } }),
      prisma.postTag.createMany({ data: tagIds.map((tagId) => ({ postId, tagId })), skipDuplicates: true }),
    ]);
  }

  async findTagsByPost(postId: string): Promise<ServiceResponse<Nullable<Tag[]>>> {
    try {
      const postTags = await prisma.postTag.findMany({ where: { postId }, include: { tag: true } });

      const tags = postTags.map((postTag) => postTag.tag);
      return ServiceResponse.success('태그를 조회했습니다.', tags, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findTagsByPost Error');
    }
  }

  async findPostsByTag(tagId: string, options = { skip: 0, take: 10 }): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.findMany({
        where: { postTags: { some: { tagId } } },
        orderBy: { publishedAt: 'desc' },
        skip: options.skip,
        take: options.take,
        include: { postTags: { include: { tag: true } } },
      });

      return ServiceResponse.success('게시물을 찾았습니다.', posts, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findPostsByTag Error');
    }
  }
}

export const postTagService = new PostTagService();
