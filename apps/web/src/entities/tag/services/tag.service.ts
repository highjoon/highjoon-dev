import { asc, count, db, eq, schema } from '@highjoon-dev/drizzle';
import type { Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { normalizeTagName } from '@/entities/tag/lib/normalizeTagName';
import type { Tag, TagWithCount } from '@/entities/tag/model/types';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { isPgUniqueViolation } from '@/shared/server/lib/isPgUniqueViolation';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

class TagService {
  async findOrCreateTag(name: Tag['name']): Promise<Tag> {
    const normalizedName = normalizeTagName(name);

    const [created]: Tag[] = await db
      .insert(schema.tag)
      .values({ name: normalizedName })
      .onConflictDoNothing()
      .returning();

    if (created) {
      return created;
    }

    const [existing]: Tag[] = await db.select().from(schema.tag).where(eq(schema.tag.name, normalizedName)).limit(1);

    if (!existing) {
      throw new Error('태그를 생성하거나 조회하지 못했습니다.');
    }

    return existing;
  }

  async findOrCreateTags(names: string[]): Promise<Tag[]> {
    const uniqueNames = [...new Set(names.map(normalizeTagName))];
    const tags = await Promise.all(uniqueNames.map(this.findOrCreateTag));
    return tags;
  }

  async findAllTags(): Promise<ServiceResponse<Nullable<TagWithCount[]>>> {
    try {
      const tags: TagWithCount[] = await db
        .select({
          id: schema.tag.id,
          name: schema.tag.name,
          createdAt: schema.tag.createdAt,
          updatedAt: schema.tag.updatedAt,
          postCount: count(schema.postTag.id),
        })
        .from(schema.tag)
        .leftJoin(schema.postTag, eq(schema.tag.id, schema.postTag.tagId))
        .groupBy(schema.tag.id)
        .orderBy(asc(schema.tag.name));

      return ServiceResponse.success('태그를 조회했습니다.', tags, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllTags Error');
    }
  }

  async findTag(id: Tag['id']): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const [tag]: Tag[] = await db.select().from(schema.tag).where(eq(schema.tag.id, id)).limit(1);

      if (!tag) {
        return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('태그를 찾았습니다.', tag, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findTag Error');
    }
  }

  async createTag(data: { name: Tag['name'] }): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const normalizedName = normalizeTagName(data.name);

      const [tag]: Tag[] = await db
        .insert(schema.tag)
        .values({ name: normalizedName })
        .onConflictDoNothing()
        .returning();

      if (!tag) {
        return ServiceResponse.failure('이미 존재하는 태그입니다.', null, StatusCodes.BAD_REQUEST);
      }

      return ServiceResponse.success('태그가 생성되었습니다.', tag, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createTag Error');
    }
  }

  async updateTag(id: Tag['id'], data: { name: Tag['name'] }): Promise<ServiceResponse<Nullable<Tag>>> {
    try {
      const normalizedName = normalizeTagName(data.name);

      const [tag]: Tag[] = await db
        .update(schema.tag)
        .set({ name: normalizedName })
        .where(eq(schema.tag.id, id))
        .returning();

      if (!tag) {
        return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('태그가 수정되었습니다.', tag, StatusCodes.OK);
    } catch (error) {
      if (isPgUniqueViolation(error)) {
        return ServiceResponse.failure('이미 존재하는 태그입니다.', null, StatusCodes.BAD_REQUEST);
      }
      return handleInternalError(error, 'updateTag Error');
    }
  }

  async deleteTag(id: Tag['id']): Promise<ServiceResponse<null>> {
    try {
      const [deleted] = await db.delete(schema.tag).where(eq(schema.tag.id, id)).returning({ id: schema.tag.id });

      if (!deleted) {
        return ServiceResponse.failure('태그를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('태그가 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      return handleInternalError(error, 'deleteTag Error');
    }
  }
}

export const tagService = new TagService();
