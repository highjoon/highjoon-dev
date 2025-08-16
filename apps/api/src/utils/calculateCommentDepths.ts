import { calculateCommentDepth } from './calculateCommentDepth';

/**
 * 여러 댓글의 depth를 한 번에 계산하는 순수 유틸리티 함수
 * @param commentIds - 댓글 ID 배열
 * @param commentMap - 댓글 ID와 parentId를 매핑한 객체
 * @returns 댓글 ID와 depth를 매핑한 객체
 */
export const calculateCommentDepths = (
  commentIds: string[],
  commentMap: Record<string, string | null>,
): Record<string, number> => {
  if (commentIds.length === 0) {
    return {};
  }

  const depthMap: Record<string, number> = {};

  // 각 댓글의 depth 계산
  for (const commentId of commentIds) {
    depthMap[commentId] = calculateCommentDepth(commentId, commentMap);
  }

  return depthMap;
};
