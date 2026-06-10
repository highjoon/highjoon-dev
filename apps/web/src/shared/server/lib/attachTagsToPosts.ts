/**
 * 조인으로 가져온 (postTag, tag) 행을 postId별로 묶어 게시물마다 `postTags`로 붙인다.
 *
 * @param posts id를 가진 게시물 목록
 * @param rows  postTag와 tag가 짝지어진 조인 결과 행
 * @returns 각 게시물에 `postTags: (PT & { tag })[]`가 붙은 새 배열
 */
export const attachTagsToPosts = <P extends { id: string }, PT extends { postId: string }, T>(
  posts: P[],
  rows: { postTag: PT; tag: T }[],
): Array<P & { postTags: Array<PT & { tag: T }> }> => {
  const tagsByPost = new Map<string, Array<PT & { tag: T }>>();

  for (const { postTag, tag } of rows) {
    const list = tagsByPost.get(postTag.postId) ?? [];
    list.push({ ...postTag, tag });
    tagsByPost.set(postTag.postId, list);
  }

  return posts.map((post) => ({ ...post, postTags: tagsByPost.get(post.id) ?? [] }));
};
