import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';
import remarkToc from 'remark-toc';

const options: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkToc, remarkGfm],
    rehypePlugins: [remarkMdxImages, rehypeSlug, rehypeHighlight],
  },
};

const MDXContent = ({ ...props }: MDXRemoteProps) => {
  return <MDXRemote {...props} options={options} />;
};

export default MDXContent;
