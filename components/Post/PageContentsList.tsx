'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { Post } from '@/types/post';
import createPostPath from '@/utils/createPostPath';
import HashTag from '../Tags/HashTag';
import PostCard from './PostCard';

type Props = {
  posts: Post[];
};

const PageContentsList = ({ posts }: Props) => {
  return (
    <AnimatePresence>
      <motion.ul
        className="border-b-[1px] border-b-grey-100"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}>
        {posts.map((post, index) => (
          <li key={post.title + index} className="pb-3">
            <Link href={createPostPath(post.fileName)} passHref>
              <PostCard title={post.title} description={post.description} date={post.date} bannerImg={post.bannerImg} />
            </Link>
            <div className="flex gap-2 px-2 overflow-scroll">
              {post.tags.map((tag, index) => (
                <HashTag key={tag + index} href={ROUTES.TAGS + tag + '/1'} passHref tag={`# ${tag}`} />
              ))}
            </div>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default PageContentsList;
