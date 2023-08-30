import Image from 'next/image';

import Title from '@/components/Common/Title';
import ProfileImage from '@/public/images/img-profile.png';

export async function generateMetadata() {
  return {
    title: 'About',
  };
}

export default function Page() {
  return (
    <>
      <Title title="About" />
      <div className="flex flex-col gap-5 sm:flex-row md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-3">
          <Image
            src={ProfileImage}
            width={200}
            height={200}
            alt="profile-image"
            className="p-5 rounded-full bg-primary-50 dark:bg-grey-600"
          />
          <p className="italic">하고 싶은건 많은데 시간이 없다!</p>
        </div>
        <div className="flex flex-col">
          <div className="mb-5">
            <p className="mb-3 text-lg md:text-2xl">윤상준</p>
            <p className="text-grey-700 dark:text-grey-300">1년차 웹 프론트엔드 개발자입니다.</p>
            <p className="text-grey-700 dark:text-grey-300">라이브커머스 솔루션 기업에서 재직 중입니다.</p>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <span className="mr-3 font-bold">(주) 모비두</span>
              <p>2023. 01 ~ 재직중</p>
            </li>
            <li>
              <span className="mr-3 font-bold">(주) 노트하우</span>
              <p>2022. 10 ~ 2022. 11</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
