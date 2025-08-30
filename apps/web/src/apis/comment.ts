import { Comment } from '@highjoon-dev/prisma';
import { CommentWithUser, ServiceResponseInterface } from '@highjoon-dev/types';

import { ApiClient } from '@/types/apiClient';
import { CommentApiRequest } from '@/types/comment';

export const commentApi = (api: ApiClient) => {
  return {
    /* 댓글 조회 */
    get: (params: CommentApiRequest['get']) =>
      api.get<ServiceResponseInterface<CommentWithUser[]>>(`/comment/${params.postId}`, { cache: 'no-store' }),
    /* 댓글 생성 */
    create: (params: CommentApiRequest['create']) =>
      api.post<ServiceResponseInterface<Comment>>('/comment', { json: params }),
    /* 댓글 수정 */
    update: (params: CommentApiRequest['update']) =>
      api.put<ServiceResponseInterface<Comment>>(`/comment/${params.commentId}`, {
        json: { content: params.content },
      }),
    /* 댓글 삭제 */
    delete: (params: CommentApiRequest['delete']) =>
      api.del<ServiceResponseInterface<null>>(`/comment/${params.commentId}`),
    /* 대댓글 조회 */
    getReplies: (params: CommentApiRequest['getReplies']) =>
      api.get<ServiceResponseInterface<CommentWithUser[]>>(`/comment/replies/${params.parentId}`, {
        cache: 'no-store',
      }),
    /* 대댓글 생성 */
    createReply: (params: CommentApiRequest['createReply']) =>
      api.post<ServiceResponseInterface<Comment>>('/comment/reply', {
        json: params,
      }),
    /* 대댓글 수정 */
    updateReply: (params: CommentApiRequest['updateReply']) =>
      api.put<ServiceResponseInterface<Comment>>(`/comment/reply/${params.replyId}`, {
        json: { content: params.content },
      }),
    /* 대댓글 삭제 */
    deleteReply: (params: CommentApiRequest['deleteReply']) =>
      api.del<ServiceResponseInterface<null>>(`/comment/reply/${params.replyId}`),
  } as const;
};
