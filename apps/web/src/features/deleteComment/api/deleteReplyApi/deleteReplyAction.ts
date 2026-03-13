'use server';

import { commentService } from '@/entities/comment/services/comment.service';
import { type DeleteReplyRequestDto } from '@/features/deleteComment/api/deleteReplyApi/dto';

export const deleteReplyAction = async (params: DeleteReplyRequestDto) => {
  await commentService.deleteReply(params.replyId);
};
