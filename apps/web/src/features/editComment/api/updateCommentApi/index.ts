import { ServiceResponseInterface } from '@highjoon-dev/types';

import { UpdateCommentRequestDto, UpdateCommentResponseDto } from '@/features/editComment/api/updateCommentApi/dto';
import { ApiClient } from '@/shared/api';

export const updateCommentApi = async (api: ApiClient, { commentId, content }: UpdateCommentRequestDto) => {
  const response = await api.put<ServiceResponseInterface<UpdateCommentResponseDto>>(`/comment/${commentId}`, {
    json: { content },
  });

  return response.data;
};
