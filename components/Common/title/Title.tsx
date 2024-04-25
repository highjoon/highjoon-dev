import { PropsWithChildren } from 'react';
import { Text } from '@mantine/core';
import styles from './Title.module.scss';

interface TitleProps extends PropsWithChildren {
  title: string;
}

type SubTitleProps = {
  subTitle: string;
};

const Title = ({ title, children }: TitleProps) => {
  return (
    <>
      <Text component="h1" className={styles.title}>
        {title}
      </Text>
      {children}
    </>
  );
};

const SubTitle = ({ subTitle }: SubTitleProps) => {
  return (
    <Text component="h3" className="font-bold text-md sm:text-lg md:text-xl text-grey-700 dark:text-grey-200">
      {subTitle}
    </Text>
  );
};

Title.Subtitle = SubTitle;

export default Title;
