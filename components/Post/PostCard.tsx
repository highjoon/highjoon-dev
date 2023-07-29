import Image from 'next/image';
import Link from 'next/link';
import MockReactImage from 'public/images/img-mock-react.png';

const PostCard = () => {
  return (
    <li className="max-w-[768px] w-full h-[570px] mx-auto hover:bg-grey-50 cursor-pointer border-b-[1px] border-b-grey-100">
      <Link href={'/post/1'} className="">
        <div className="relative h-[400px]">
          <Image src={MockReactImage} fill alt="post-logo" />
        </div>
        <div className="flex flex-col justify-between gap-2 py-2">
          <p className="text-xl font-bold text-grey-900">
            [번역] 터보팩은 정말로 Vite 보다 10배는 더 빠를까? [Is Turbopack really 10x Faster than Vite?]
          </p>
          <p className="text-grey-700">
            [번역] 터보팩은 정말로 Vite 보다 10배는 더 빠를까? [Is Turbopack really 10x Faster than Vite?]
          </p>
          <p className="text-grey-400">2022년 12월 8일</p>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
