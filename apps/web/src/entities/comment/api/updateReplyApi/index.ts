import { UpdateReplyRequestDto, UpdateReplyResponseDto } from '@/entities/comment/api/updateReplyApi/dto';
import { ApiClient } from '@/shared/api';

export const updateReplyApi = async (api: ApiClient, params: UpdateReplyRequestDto) => {
  const response = await api.put<UpdateReplyResponseDto>(`/comment/reply/${params.replyId}`, {
    json: { content: params.content },
  });

  return response.data;
};
