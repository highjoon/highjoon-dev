import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';

const options: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [remarkMdxImages, rehypeSlug],
  },
};

const MDXContent = ({ ...props }: MDXRemoteProps) => {
  return <MDXRemote {...props} options={options} />;
};

export default MDXContent;
