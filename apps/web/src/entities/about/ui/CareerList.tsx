'use client';

import { CAREERS } from '@/entities/about/model/career';
import CareerItem from '@/entities/about/ui/CareerItem';

export const CareerList = () => {
  return (
    <ul className="space-y-8">
      {CAREERS.map((career) => (
        <CareerItem key={career.company} career={career} />
      ))}
    </ul>
  );
};
