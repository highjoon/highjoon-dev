import { PropsWithChildren } from 'react';

interface TitleProps extends PropsWithChildren {
  title: string;
}

type SubTitleProps = {
  subTitle: string;
};

const Title = ({ title, children }: TitleProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-grey-900 dark:text-white">{title}</h1>
      {children}
    </>
  );
};

const SubTitle = ({ subTitle }: SubTitleProps) => {
  return <h3 className="font-bold text-md sm:text-lg md:text-xl text-grey-700 dark:text-grey-200">{subTitle}</h3>;
};

Title.Subtitle = SubTitle;

export default Title;
