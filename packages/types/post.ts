import { Nullable } from "./utils";

export type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  contentUrl: string;
  bannerImageUrl: string;
  publishedAt: Date;
  tags: string[];
  category: Nullable<string>;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
  viewCount: Nullable<number>;
  likeCount: Nullable<number>;
};
