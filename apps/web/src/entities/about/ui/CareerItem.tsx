import React from 'react';

import { Career } from '@/entities/about/model/career';
import { formatCareerDate } from '@/page/about/lib/date';

type Props = {
  career: Career;
};

const CareerItem = ({ career }: Props) => {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span className="text-base font-bold text-primary md:text-lg">{career.company}</span>
        <span className="text-sm text-muted-foreground">{career.position}</span>
        <span className="text-xs text-muted-foreground">
          <time dateTime={new Date(career.startDate as unknown as string).toISOString()}>
            {formatCareerDate(career.startDate)}
          </time>
          {' ~ '}
          {career.endDate ? (
            <time dateTime={new Date(career.endDate as unknown as string).toISOString()}>
              {formatCareerDate(career.endDate)}
            </time>
          ) : (
            '재직중'
          )}
        </span>
      </div>

      {career.projects.length > 0 && (
        <ul className="mt-1 space-y-2">
          {career.projects.map((project) => (
            <li key={project.name} className="leading-relaxed">
              <div className="font-medium text-foreground">{project.name}</div>
              <div className="text-xs text-muted-foreground">
                <time dateTime={new Date(project.startDate as unknown as string).toISOString()}>
                  {formatCareerDate(project.startDate)}
                </time>
                {' ~ '}
                {project.endDate ? (
                  <time dateTime={new Date(project.endDate as unknown as string).toISOString()}>
                    {formatCareerDate(project.endDate)}
                  </time>
                ) : (
                  '진행 중'
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CareerItem;
