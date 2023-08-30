import Image from 'next/image';
import MDXContent from '../MDX/MDXContent';
import TableOfContents from './TableOfContents';

type Props = {
  title: string;
  bannerImg: string;
  content: string;
};

const PageContent = ({ title, bannerImg, content }: Props) => {
  return (
    <article className="relative mx-auto prose-sm prose md:prose-base lg:prose-lg prose-slate mb-[200px] dark:prose-invert">
      <h1>{title}</h1>
      <Image className="my-0" src={bannerImg} width={768} height={400} alt="content-logo" priority />
      <div className="absolute top-0 right-[-50px] hidden xl:block">
        <TableOfContents />
      </div>
      <MDXContent source={content} />
    </article>
  );
};

export default PageContent;
