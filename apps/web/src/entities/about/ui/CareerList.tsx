'use client';

import { Flex } from '@mantine/core';

import { CAREERS } from '@/entities/about/model/career';
import CareerItem from '@/entities/about/ui/CareerItem';

export const CareerList = () => {
  return (
    <Flex component="ul" direction="column" gap={40}>
      {CAREERS.map((career) => (
        <CareerItem key={career.company} career={career} />
      ))}
    </Flex>
  );
};
