export interface Tag {
  id: string;
  name: string;
}

export type TagWithCount = Tag & {
  postCount: number;
};
