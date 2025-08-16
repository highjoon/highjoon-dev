/**
 * 댓글의 depth를 계산하는 순수 유틸리티 함수
 * @param commentId - 댓글 ID
 * @param commentMap - 댓글 ID와 parentId를 매핑한 객체
 * @returns 댓글의 depth (0: 최상위 댓글, 1: 대댓글, 2: 대대댓글, ...)
 */
export const calculateCommentDepth = (commentId: string, commentMap: Record<string, string | null>): number => {
  let depth = 0;
  let currentCommentId = commentId;

  // parentId를 따라가면서 depth 계산
  while (true) {
    const parentId = commentMap[currentCommentId];

    if (!parentId) {
      break;
    }

    depth++;
    currentCommentId = parentId;

    // 무한 루프 방지 (최대 10단계)
    if (depth > 10) {
      break;
    }
  }

  return depth;
};
