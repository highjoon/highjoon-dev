import { type Post } from '@highjoon-dev/prisma';
import matter from 'gray-matter';

import { getPost } from '@/apis/post';

const getBlogPost = async ({ slug }: { slug: Post['slug'] }) => {
  const post = await getPost(slug);
  const contentUrl = await fetch(post.data.contentUrl).then((res) => res.text());
  const { content } = matter(contentUrl);

  return { post: post.data, content };
};

export default getBlogPost;
