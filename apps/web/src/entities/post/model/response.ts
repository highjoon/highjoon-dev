export interface ParentRefResponse {
  id: string;
  slug: string;
  title: string;
}

export interface CategoryRefResponse extends ParentRefResponse {
  parent: ParentRefResponse | null;
}

export interface TagRefResponse {
  id: string;
  name: string;
}

export interface PostResponse {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentUrl: string;
  bannerImageUrl: string;
  publishedAt: string;
  viewCount: number;
  category: CategoryRefResponse | null;
  tags: TagRefResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface PostSummaryResponse {
  slug: string;
  title: string;
}

export interface PostDetailResponse {
  post: PostResponse;
  previous: PostSummaryResponse | null;
  next: PostSummaryResponse | null;
}
