import Link from 'next/link';

import Pagination from '@/components/Common/Pagination';
import PostCard from '@/components/Post/PostCard';
import { posts } from '@/services/data/posts';
import createPostPath from '@/services/utils/createPostPath';

export default function Home() {
  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      {posts.map((post) => (
        <Link href={createPostPath(post.fileName)} passHref key={post.title}>
          <PostCard title={post.title} description={post.description} date={post.date} bannerImg={post.bannerImg} />
        </Link>
      ))}
      <Pagination currentPageNumber={2} nextPageLink={'#'} prevPageLink={'#'} hasNextPage />
    </div>
  );
}
