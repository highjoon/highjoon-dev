import Image from 'next/image';
import { Flex, Text } from '@mantine/core';
import styles from './PostCard.module.scss';

type Props = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
};

const PostCard = ({ title, description, date, bannerImg }: Props) => {
  return (
    <div className={styles.root}>
      <Image src={bannerImg} width={1080} height={400} alt="post-logo" priority />
      <Flex direction="column" justify="space-between" className={styles.wrapper}>
        <Text className={styles.title}>{title}</Text>
        <p className={styles.description}>{description}</p>
        <p className={styles.date}>{date}</p>
      </Flex>
    </div>
  );
};

export default PostCard;
