import Image from 'next/image';
import { Flex, Text } from '@mantine/core';
import ProfileImage from '@/public/images/img-profile.png';
import styles from './AboutMe.module.scss';

const AboutMe = () => {
  return (
    <Flex gap={100}>
      <Flex direction="column" align="center" gap={30}>
        <Image className={styles['profile-image']} src={ProfileImage} width={200} height={200} alt="profile-image" />
        <Text fs="italic">부족함이 많습니다.</Text>
      </Flex>
      <Flex direction="column" gap={30}>
        <Flex direction="column" gap={10}>
          <Text fz="h2" lh="h2" fw="bold">
            윤상준
          </Text>
          <Text>2년차 웹 프론트엔드 개발자입니다.</Text>
        </Flex>
        <Flex component="ul" direction="column" gap={20}>
          <Flex component="li" direction="column" gap={5}>
            <Text component="span" fw="bold">
              (주) 모비두
            </Text>
            <Text>2023. 01 ~ 재직중</Text>
          </Flex>
          <Flex component="li" direction="column" gap={5}>
            <Text component="span" fw="bold">
              (주) 노트하우
            </Text>
            <Text>2022. 10 ~ 2022. 11</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutMe;
