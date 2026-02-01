import { ExternalLink } from 'lucide-react';

import type { Career } from '@/entities/about/model/career';
import { getCompanyInfo } from '@/entities/about/model/company';
import { ProjectList } from '@/entities/about/ui/ProjectList';
import { formatCareerDate } from '@/page/about/lib/date';

type Props = {
  career: Career;
};

export const ExperienceCard = ({ career }: Props) => {
  const { link, description, team, summary } = getCompanyInfo(career.company);
  const isPresent = !career.endDate;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8 group">
      <div className="md:w-1/4 shrink-0">
        <span
          className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-2 ${
            isPresent
              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
          {formatCareerDate(career.startDate)} ~ {isPresent ? 'Present' : formatCareerDate(career.endDate!)}
        </span>
        <h3 className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
              {career.company}
              <ExternalLink size={16} className="text-slate-400" />
            </a>
          ) : (
            career.company
          )}
        </h3>
        <div className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
          {team && <p className="text-slate-400 dark:text-slate-500">{team}</p>}
          <p>{career.position}</p>
        </div>
        {description && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{description}</p>}
      </div>
      <div className="py-1 pl-6 transition-colors border-l-2 md:w-3/4 border-slate-200 dark:border-slate-800 md:pl-8 group-hover:border-indigo-500">
        {summary && <p className="mb-4 font-medium leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>}
        <ProjectList projects={career.projects} />
      </div>
    </div>
  );
};
