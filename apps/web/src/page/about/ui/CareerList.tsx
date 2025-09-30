'use client';

import { Flex, List, Text } from '@mantine/core';

import { CAREERS } from '@/entities/about/model/career';
import { formatCareerDate } from '@/page/about/lib/date';

import styles from './AboutPage.module.scss';

export const CareerList = () => {
  return (
    <Flex component="ul" direction="column" gap={40}>
      {CAREERS.map((career) => (
        <Flex key={career.company} component="li" direction="column" gap={20}>
          <Flex direction="column">
            <Text component="span" fw="bold" size="md" c="indigo">
              {career.company}
            </Text>
            <Text size="md">Frontend Developer</Text>
            <Text className={styles.term} size="sm">
              {formatCareerDate(career.startDate)}&nbsp;~&nbsp;
              {career.endDate ? formatCareerDate(career.endDate) : '재직중'}
            </Text>
          </Flex>

          {career.projects.length > 0 && (
            <List className={styles['career-wrapper']}>
              {career.projects.map((project) => (
                <List.Item key={project.name}>
                  <Text size="md">{project.name}</Text>
                  <Text className={styles.term} size="sm">
                    {formatCareerDate(project.startDate)}&nbsp;~&nbsp;
                    {project.endDate ? formatCareerDate(project.endDate) : '진행 중'}
                  </Text>
                  <Text className={styles['career-description']} size="sm">
                    {project.description}
                  </Text>
                </List.Item>
              ))}
            </List>
          )}
        </Flex>
      ))}
    </Flex>
  );
};
