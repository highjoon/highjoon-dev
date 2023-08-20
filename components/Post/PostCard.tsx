import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
};

const PostCard = ({ title, description, date, bannerImg }: Props) => {
  return (
    <div className="max-w-[768px] w-full max-h-[400px] md:max-h-[570px] mx-auto cursor-pointer">
      <Image src={bannerImg} width={768} height={400} alt="post-logo" priority />
      <div className="flex flex-col justify-between gap-2 p-2">
        <p className="text-lg font-bold lg:text-xl text-grey-900">{title}</p>
        <p className="text-sm lg:text-lg text-grey-700">{description}</p>
        <p className="text-sm lg:text-md text-grey-600">{date}</p>
      </div>
    </div>
  );
};

export default PostCard;
