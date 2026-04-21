export interface GiscusStats {
  commentCount: number;
  reactionCount: number;
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const GET_DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $name: String!, $categoryId: ID!, $after: String) {
    repository(owner: $owner, name: $name) {
      discussions(first: 100, categoryId: $categoryId, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          comments { totalCount }
          reactions { totalCount }
        }
      }
    }
  }
`;

interface DiscussionNode {
  title: string;
  comments: { totalCount: number };
  reactions: { totalCount: number };
}

interface DiscussionsPage {
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  nodes: DiscussionNode[];
}

// giscus discussion title 형식: "blogs/slug" (mapping="pathname")
// 실제 GitHub Discussions 확인 결과: leading slash 없이 "blogs/slug-name" 형식으로 생성됨
function extractSlugFromTitle(title: string): string | null {
  const match = title.match(/^\/?blogs\/(.+)$/);
  return match ? match[1] : null;
}

export async function fetchAllGiscusStats(): Promise<Record<string, GiscusStats>> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!token || !repo || !categoryId) {
    return {};
  }

  const [owner, name] = repo.split('/');
  const statsMap: Record<string, GiscusStats> = {};
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_DISCUSSIONS_QUERY,
        variables: { owner, name, categoryId, after },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) break;

    const json = (await res.json()) as { data?: { repository?: { discussions?: DiscussionsPage } } };
    const discussions: DiscussionsPage | undefined = json.data?.repository?.discussions;
    if (!discussions) break;

    for (const node of discussions.nodes) {
      const slug = extractSlugFromTitle(node.title);
      if (slug) {
        statsMap[slug] = {
          commentCount: node.comments.totalCount,
          reactionCount: node.reactions.totalCount,
        };
      }
    }

    hasNextPage = discussions.pageInfo.hasNextPage;
    after = discussions.pageInfo.endCursor;
  }

  return statsMap;
}
