import { DeleteReplyRequestDto, DeleteReplyResponseDto } from '@/entities/comment/api/deleteReplyApi/dto';
import { ApiClient } from '@/shared/api';

export const deleteReplyApi = async (api: ApiClient, params: DeleteReplyRequestDto) => {
  const response = await api.del<DeleteReplyResponseDto>(`/comment/reply/${params.replyId}`);

  return response.data;
};
