import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [remarkMdxImages],
  },
};

const MDXContent = ({ ...props }: MDXRemoteProps) => {
  return <MDXRemote {...props} options={options} />;
};

export default MDXContent;
