import Link from 'next/link';
import PostCard from './PostCard';

import { ROUTES } from '@/services/constants/routes';
import { Post } from '@/services/types/post';
import createPostPath from '@/services/utils/createPostPath';

type Props = {
  posts: Post[];
};

const PageContentsList = ({ posts }: Props) => {
  return (
    <ul className="border-b-[1px] border-b-grey-100">
      {posts.map((post, index) => (
        <li key={post.title + index} className="pb-3">
          <Link href={createPostPath(post.fileName)} passHref>
            <PostCard title={post.title} description={post.description} date={post.date} bannerImg={post.bannerImg} />
          </Link>
          <div className="flex gap-2 px-2 overflow-scroll">
            {post.tags.map((tag, index) => (
              <Link
                key={tag + index}
                href={ROUTES.TAGS + tag + '/1'}
                passHref
                className="px-2 py-1 text-xs rounded-lg sm:text-sm text-primary-500 bg-primary-50 shrink-0">
                {tag}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PageContentsList;
