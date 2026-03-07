import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

type SerializeOptions = NonNullable<MDXRemoteProps['options']>;
import rehypeHighlight from 'rehype-highlight';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const options: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkToc, remarkGfm],
    rehypePlugins: [rehypeMdxImportMedia, rehypeSlug, rehypeHighlight],
  },
};

export default function MDXContent({ ...props }: MDXRemoteProps) {
  return <MDXRemote {...props} options={options} />;
}
