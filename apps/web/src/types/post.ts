export type FrontMatter = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
  tags: string[];
};

export interface TagPath {
  tag: string;
  id: string;
}
