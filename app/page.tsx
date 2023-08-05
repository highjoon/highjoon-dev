import Link from 'next/link';
import { readdirSync } from 'fs';
import path from 'path';

import PostCard from '@/components/Post/PostCard';
import { BLOG_CONTENTS_DIR } from '@/services/constants/blogPosts';
import createPostPath from '@/services/utils/createPostPath';
import getBlogPosts from '@/services/utils/getBlogPosts';

export default function Home() {
  const files = readdirSync(path.join(BLOG_CONTENTS_DIR));
  const blogPosts = getBlogPosts(files);

  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto">
      {blogPosts.map((blog) => (
        <Link href={createPostPath(blog.slug)} passHref key={blog.slug}>
          <PostCard
            title={blog.meta.title}
            description={blog.meta.description}
            date={blog.meta.date}
            bannerImg={blog.meta.bannerImg}
          />
        </Link>
      ))}
    </div>
  );
}
