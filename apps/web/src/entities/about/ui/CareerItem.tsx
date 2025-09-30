import React from 'react';
import { Flex, List, Text } from '@mantine/core';

import { Career } from '@/entities/about/model/career';
import { formatCareerDate } from '@/page/about/lib/date';

import styles from './CareerItem.module.scss';

type Props = {
  career: Career;
};

const CareerItem = ({ career }: Props) => {
  return (
    <Flex key={career.company} component="li" direction="column" gap={20}>
      <Flex direction="column">
        <Text component="span" fw="bold" size="md" c="indigo">
          {career.company}
        </Text>
        <Text size="md">{career.position}</Text>
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
  );
};

export default CareerItem;
