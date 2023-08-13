import Link from 'next/link';
import PostCard from './PostCard';

import { Post } from '@/services/types/post';
import createPostPath from '@/services/utils/createPostPath';

type Props = {
  currentPagePosts: Post[];
};

const PageContentsList = ({ currentPagePosts }: Props) => {
  return (
    <ul>
      {currentPagePosts.map((post, index) => (
        <li key={post.title + index}>
          <Link href={createPostPath(post.fileName)} passHref>
            <PostCard title={post.title} description={post.description} date={post.date} bannerImg={post.bannerImg} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PageContentsList;
