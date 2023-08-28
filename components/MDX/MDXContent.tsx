import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';

import { POST_ID_PREFIX } from '@/services/constants/blogPosts';

const options: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [remarkMdxImages, () => rehypeSlug({ prefix: POST_ID_PREFIX }), rehypeHighlight],
  },
};

const MDXContent = ({ ...props }: MDXRemoteProps) => {
  return <MDXRemote {...props} options={options} />;
};

export default MDXContent;
