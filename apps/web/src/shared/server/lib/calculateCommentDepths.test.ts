import { calculateCommentDepths } from './calculateCommentDepths';

describe('calculateCommentDepths', () => {
  test('빈 배열이면 빈 객체를 반환한다', () => {
    expect(calculateCommentDepths([], {})).toEqual({});
  });

  test('여러 댓글의 depth를 한 번에 계산한다', () => {
    const commentMap: Record<string, string | null> = {
      'comment-1': null,
      'comment-2': null,
      'reply-1': 'comment-1',
      'reply-2': 'reply-1',
    };

    const result = calculateCommentDepths(['comment-1', 'comment-2', 'reply-1', 'reply-2'], commentMap);

    expect(result).toEqual({
      'comment-1': 0,
      'comment-2': 0,
      'reply-1': 1,
      'reply-2': 2,
    });
  });
});
