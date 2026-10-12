export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  contentUrl: string;
  bannerImageUrl: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface PostTag {
  tagId: string;
}
