import Image from 'next/image';
import MockReactImage from 'public/images/img-mock-react.png';

type Props = {
  title: string;
  description: string;
  date: string;
};

const PostCard = ({ title, description, date }: Props) => {
  return (
    <div className="max-w-[768px] w-full h-[570px] mx-auto hover:bg-grey-50 cursor-pointer border-b-[1px] border-b-grey-100">
      <div className="relative h-[400px]">
        <Image src={MockReactImage} fill alt="post-logo" priority />
      </div>
      <div className="flex flex-col justify-between gap-2 py-2">
        <p className="text-xl font-bold text-grey-900">{title}</p>
        <p className="text-grey-700">{description}</p>
        <p className="text-grey-400">{date}</p>
      </div>
    </div>
  );
};

export default PostCard;
