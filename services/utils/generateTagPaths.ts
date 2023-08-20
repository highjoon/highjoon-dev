import { TagPath } from '../types/post';

const generateTagPaths = (tag: string, pageCount: number): TagPath[] => {
  return Array.from({ length: pageCount }, (_, index) => ({
    tag,
    id: String(index + 1),
  }));
};

export default generateTagPaths;
