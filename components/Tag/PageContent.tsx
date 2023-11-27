'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import HashTag from '../Tags/HashTag';

import { ROUTES } from '@/constants/routes';

type Props = {
  tagCountsArray: {
    [key: string]: number;
  }[];
};

const PageContent = ({ tagCountsArray }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}>
        {tagCountsArray.map((tagCount, index) => {
          const tag = Object.keys(tagCount)[0];
          const count = tagCount[tag];
          return (
            <HashTag key={tag + index} href={ROUTES.TAGS + tag + '/1'} passHref tag={`# ${tag}`}>
              <HashTag.Count count={count} />
            </HashTag>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageContent;
