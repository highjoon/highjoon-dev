import { calculateCommentDepth } from './calculateCommentDepth';

describe('calculateCommentDepth', () => {
  test('최상위 댓글의 depth는 0이다', () => {
    const commentMap: Record<string, string | null> = {
      'comment-1': null,
    };

    expect(calculateCommentDepth('comment-1', commentMap)).toBe(0);
  });

  test('대댓글의 depth는 1이다', () => {
    const commentMap: Record<string, string | null> = {
      'comment-1': null,
      'reply-1': 'comment-1',
    };

    expect(calculateCommentDepth('reply-1', commentMap)).toBe(1);
  });

  test('대대댓글의 depth는 2이다', () => {
    const commentMap: Record<string, string | null> = {
      'comment-1': null,
      'reply-1': 'comment-1',
      'reply-2': 'reply-1',
    };

    expect(calculateCommentDepth('reply-2', commentMap)).toBe(2);
  });

  test('존재하지 않는 댓글 ID는 depth 0을 반환한다', () => {
    const commentMap: Record<string, string | null> = {};

    expect(calculateCommentDepth('unknown', commentMap)).toBe(0);
  });

  test('무한 루프 방지를 위해 최대 depth는 10이다', () => {
    const commentMap: Record<string, string | null> = {};
    for (let i = 0; i <= 15; i++) {
      commentMap[`c-${i}`] = i > 0 ? `c-${i - 1}` : null;
    }

    expect(calculateCommentDepth('c-15', commentMap)).toBeLessThanOrEqual(11);
  });
});
