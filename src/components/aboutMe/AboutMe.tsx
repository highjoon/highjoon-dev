'use client';

import Image from 'next/image';
import { Divider, Flex, List, Text, Title } from '@mantine/core';

import ProfileImage from '@/public/images/img-profile.png';

import styles from './AboutMe.module.scss';

const AboutMe = () => {
  return (
    <Flex className={styles.container}>
      <Flex direction="column">
        <Image className={styles['profile-image']} src={ProfileImage} width={200} height={200} alt="profile-image" />
      </Flex>
      <Flex direction="column" gap={30} flex={1}>
        <Flex direction="column" gap={20}>
          <Title order={2}>윤상준</Title>
          <Flex direction="column" gap={5}>
            <Text className={styles.introduction}>2년차 웹 프론트엔드 개발자입니다.</Text>
            <Text className={styles.introduction}>
              고객이 있어야 회사가 있다고 믿고 있으며 고객 경험 향상에 기여하려고 노력합니다.
            </Text>
            <Text className={styles.introduction}>
              변경과 확장에 유연하게 대응할 수 있는 컴포넌트를 설계하기 위해 고민합니다.
            </Text>
            <Text className={styles.introduction}>
              제품의 디테일한 요소를 챙기는 것을 좋아하며 더 나은 제품을 만들기 위해 적극적으로 아이디어를 제시합니다.
            </Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex component="ul" direction="column" gap={40}>
          <Flex component="li" direction="column" gap={20}>
            <Flex direction="column">
              <Text component="span" fw="bold" size="md" c="indigo">
                (주) 모비두
              </Text>
              <Text size="md">Frontend Developer</Text>
              <Text className={styles['career-term']} size="sm">
                2023. 01 ~ 재직중
              </Text>
            </Flex>
            <List className={styles['career-wrapper']}>
              <List.Item>
                <Text size="md">광고 마케팅 플랫폼 개발</Text>
                <Text className={styles['career-description']} size="sm">
                  라이브 방송의 광고 캠페인 신청, 운영, 결과 리포트 확인이 가능한 플랫폼 개발
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">디자인 시스템 구축</Text>
                <Text className={styles['career-description']} size="sm">
                  디자인 시스템 컴포넌트 개발 및 라이브러리 배포
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">어드민 UI 개선</Text>
                <Text className={styles['career-description']} size="sm">
                  통합 어드민의 UI 톤 앤 매너를 개선
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">라이브 방송 운영 CMS 개발</Text>
                <Text className={styles['career-description']} size="sm">
                  라이브 방송의 구매인증 이벤트, 인서트 이미지 및 동영상 송출 기능 개발
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">라이브 플레이어 개발</Text>
                <Text className={styles['career-description']} size="sm">
                  라이브 방송 플레이어 개발 및 유지보수
                </Text>
              </List.Item>
            </List>
          </Flex>
          <Flex component="li" direction="column" gap={20}>
            <Flex direction="column">
              <Text component="span" fw="bold" size="md" c="indigo">
                (주) 노트하우
              </Text>
              <Text size="md">Frontend Developer</Text>
              <Text className={styles['career-term']} size="sm">
                2022. 10 ~ 2022. 11
              </Text>
            </Flex>
            <List className={styles['career-wrapper']}>
              <List.Item>
                <Text size="md">자사 웹서비스 구축 및 유지보수</Text>
              </List.Item>
            </List>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutMe;
