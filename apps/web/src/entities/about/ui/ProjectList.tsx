import type { Career } from '@/entities/about/model/career';
import { formatCareerDate } from '@/page/about/lib/date';

type Props = {
  projects: Career['projects'];
};

export const ProjectList = ({ projects }: Props) => {
  if (projects.length === 0) {
    return <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-300">재직중</p>;
  }

  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li key={project.name}>
          <p className="font-bold text-slate-900 dark:text-white">{project.name}</p>
          <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
            {formatCareerDate(project.startDate)} ~ {project.endDate ? formatCareerDate(project.endDate) : '진행 중'}
          </p>
          <p className="font-medium leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
        </li>
      ))}
    </ul>
  );
};
