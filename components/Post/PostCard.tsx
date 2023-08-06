import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
};

const PostCard = ({ title, description, date, bannerImg }: Props) => {
  return (
    <div className="max-w-[768px] w-full max-h-[400px] md:max-h-[570px] mx-auto hover:bg-grey-50 cursor-pointer border-b-[1px] border-b-grey-100">
      <Image src={bannerImg} width={768} height={400} alt="post-logo" priority />
      <div className="flex flex-col justify-between gap-2 p-2">
        <p className="text-xl font-bold text-grey-900">{title}</p>
        <p className="text-grey-700">{description}</p>
        <p className="text-grey-400">{date}</p>
      </div>
    </div>
  );
};

export default PostCard;
