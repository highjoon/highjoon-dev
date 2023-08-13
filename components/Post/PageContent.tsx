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
    <article className="relative mx-auto prose-sm prose md:prose-base lg:prose-lg prose-slate mb-[200px]">
      <h1>{title}</h1>
      <Image
        src={bannerImg}
        width={768}
        height={400}
        alt="content-logo"
        priority
        style={{ marginTop: '0px', marginBottom: '0px' }}
      />
      <div className="absolute top-0 right-[-50px] hidden xl:block">
        <TableOfContents />
      </div>
      <MDXContent source={content} />
    </article>
  );
};

export default PageContent;
