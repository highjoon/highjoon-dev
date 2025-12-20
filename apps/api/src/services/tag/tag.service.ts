import { prisma, type Tag } from '@highjoon-dev/prisma';
import { type Nullable } from '@highjoon-dev/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';
import { normalizeTagName } from '@/utils/normalizeTagName';

class TagService {
  async findOrCreateTag(name: string): Promise<Tag> {
    const normalized = normalizeTagName(name);

    const tag = await prisma.tag.upsert({ where: { name: normalized }, update: {}, create: { name: normalized } });

    return tag;
  }

  async findOrCreateTags(names: string[]): Promise<Tag[]> {
    const uniqueNames = [...new Set(names.map(normalizeTagName))];
    const tags = await Promise.all(uniqueNames.map(this.findOrCreateTag));
    return tags;
  }

  async findAllTags(): Promise<ServiceResponse<Nullable<Tag[]>>> {
    try {
      const tags = await prisma.tag.findMany({
        include: { _count: { select: { postTags: true } } },
        orderBy: { name: 'asc' },
      });

      return ServiceResponse.success('태그를 조회했습니다.', tags, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllTags Error');
    }
  }

  async findTag(id: string): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const tag = await prisma.tag.findUnique({ where: { id } });

      if (!tag) {
        return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('태그를 찾았습니다.', tag, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findTag Error');
    }
  }

  async createTag(data: { name: string }): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const normalized = normalizeTagName(data.name);

      const tag = await prisma.tag.create({ data: { name: normalized } });

      return ServiceResponse.success('태그가 생성되었습니다.', tag, StatusCodes.CREATED);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return ServiceResponse.failure('이미 존재하는 태그입니다.', null, StatusCodes.BAD_REQUEST);
      }
      return handleInternalError(error, 'createTag Error');
    }
  }

  async updateTag(id: string, data: { name: string }): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const normalized = normalizeTagName(data.name);

      const tag = await prisma.tag.update({ where: { id }, data: { name: normalized } });

      return ServiceResponse.success('태그가 수정되었습니다.', tag, StatusCodes.OK);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return ServiceResponse.failure('이미 존재하는 태그입니다.', null, StatusCodes.BAD_REQUEST);
        }
        if (error.code === 'P2025') {
          return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
        }
      }
      return handleInternalError(error, 'updateTag Error');
    }
  }

  async deleteTag(id: string): Promise<ServiceResponse<null>> {
    try {
      await prisma.tag.delete({ where: { id } });
      return ServiceResponse.success('태그가 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }
      return handleInternalError(error, 'deleteTag Error');
    }
  }
}

export const tagService = new TagService();
