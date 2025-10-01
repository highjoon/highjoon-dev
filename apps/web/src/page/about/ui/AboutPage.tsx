import Image from 'next/image';
import { Divider, Flex, Text, Title } from '@mantine/core';

import ProfileImage from '@/../public/images/img-profile.png';
import { CareerList } from '@/entities/about/ui/CareerList';

import styles from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <Flex direction="column" gap={100}>
      <Title component="h1" order={1}>
        About
      </Title>
      <Flex className={styles.container}>
        <Flex direction="column">
          <Image
            className={styles['profile-image']}
            src={ProfileImage}
            width={200}
            height={200}
            alt="프로필 이미지"
            sizes="200px"
          />
        </Flex>
        <Flex direction="column" gap={30} flex={1}>
          <Flex direction="column" gap={20}>
            <Title order={2}>윤상준</Title>
            <Flex direction="column" gap={5}>
              <Text className={styles.introduction}>프론트엔드 개발자입니다.</Text>
              <Text className={styles.introduction}>고객 가치 창출과 제품, 팀, 개인의 성장을 고민합니다.</Text>
              <Text className={styles.introduction}>기술적 기여를 통해 의미 있는 제품 개발에 앞장서고 있습니다.</Text>
            </Flex>
          </Flex>
          <Divider />
          <CareerList />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutPage;
