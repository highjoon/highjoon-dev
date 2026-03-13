'use server';

import { type DeleteReplyRequestDto } from '@/features/deleteComment/api/deleteReplyApi/dto';
import { commentService } from '@/shared/server/services/comment.service';

export const deleteReplyAction = async (params: DeleteReplyRequestDto) => {
  await commentService.deleteReply(params.replyId);
};
