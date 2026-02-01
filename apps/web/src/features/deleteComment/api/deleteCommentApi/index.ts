import { ServiceResponseInterface } from '@highjoon-dev/types';

import { DeleteCommentRequestDto, DeleteCommentResponseDto } from '@/features/deleteComment/api/deleteCommentApi/dto';
import { ApiClient } from '@/shared/api';

export const deleteCommentApi = async (api: ApiClient, params: DeleteCommentRequestDto) => {
  await api.del<ServiceResponseInterface<DeleteCommentResponseDto>>(`/comment/${params.commentId}`);
};
