export interface CategoryResponse {
  id: string;
  title: string;
  slug: string;
  parentId: string | null;
  createdAt: string;
}
