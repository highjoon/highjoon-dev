'use client';

import Image from 'next/image';
import { Divider, Flex, List, Text, Title } from '@mantine/core';

import ProfileImage from '@/../public/images/img-profile.png';

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
            <Text className={styles.introduction}>3년차 웹 프론트엔드 개발자입니다.</Text>
            <Text className={styles.introduction}>고객 가치 창출과 제품, 팀, 개인의 성장을 고민합니다.</Text>
            <Text className={styles.introduction}>기술적 기여를 통해 의미 있는 제품 개발에 앞장서고 있습니다.</Text>
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
              <Text className={styles.term} size="sm">
                2023. 01 ~ 재직중
              </Text>
            </Flex>
            <List className={styles['career-wrapper']}>
              <List.Item>
                <Text size="md">쇼킷</Text>
                <Text className={styles.term} size="sm">
                  2024. 04 ~ 2024.11
                </Text>
                <Text className={styles['career-description']} size="sm">
                  LLM 기반의 AI 숏폼 추출 및 영상, 자막 편집 서비스
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">소스애드 어드민</Text>
                <Text className={styles.term} size="sm">
                  2023. 12 ~ 진행 중
                </Text>
                <Text className={styles['career-description']} size="sm">
                  라이브 방송의 광고 신청 및 관리, 광고 집행 결과 리포트, 대시보드 등의 기능 제공 플랫폼
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">모비두 디자인 시스템 (mds)</Text>
                <Text className={styles.term} size="sm">
                  2023. 09 ~ 2024.03
                </Text>
                <Text className={styles['career-description']} size="sm">
                  디자인 토큰 기반의 디자인 시스템 구축 및 사내 라이브러리 배포
                </Text>
              </List.Item>
              <List.Item>
                <Text size="md">소스라이브 플레이어</Text>
                <Text className={styles.term} size="sm">
                  2023. 01 ~ 진행 중
                </Text>
                <Text className={styles['career-description']} size="sm">
                  라이브커머스 스트리밍 플레이어
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
              <Text className={styles.term} size="sm">
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
