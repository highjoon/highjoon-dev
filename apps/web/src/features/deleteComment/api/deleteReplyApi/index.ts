import { DeleteReplyRequestDto, DeleteReplyResponseDto } from '@/features/deleteComment/api/deleteReplyApi/dto';
import { ApiClient } from '@/shared/api';

export const deleteReplyApi = async (api: ApiClient, params: DeleteReplyRequestDto) => {
  await api.del<DeleteReplyResponseDto>(`/comment/reply/${params.replyId}`);
};
