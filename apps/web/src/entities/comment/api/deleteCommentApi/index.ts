import { ServiceResponseInterface } from '@highjoon-dev/types';

import { DeleteCommentRequestDto, DeleteCommentResponseDto } from '@/entities/comment/api/deleteCommentApi/dto';
import { ApiClient } from '@/shared/api';

export const deleteCommentApi = async (api: ApiClient, params: DeleteCommentRequestDto) => {
  const response = await api.del<ServiceResponseInterface<DeleteCommentResponseDto>>(`/comment/${params.commentId}`);

  return response.data;
};
