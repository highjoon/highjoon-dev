import { type Post } from '@highjoon-dev/types';
import matter from 'gray-matter';

import { getPost } from '@/apis/post';
import { type FrontMatter } from '@/types/post';

const getBlogPost = async ({ slug }: { slug: Post['slug'] }) => {
  const post = await getPost(slug);
  const contentUrl = await fetch(post.responseObject.contentUrl).then((res) => res.text());
  const { data, content } = matter(contentUrl);
  const frontMatter = { ...data, bannerImg: post.responseObject.bannerImageUrl } as FrontMatter;

  return { post: post.responseObject, frontMatter, content };
};

export default getBlogPost;
