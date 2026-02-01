import { Briefcase } from 'lucide-react';

import { CAREERS } from '@/entities/about/model/career';
import { ExperienceCard } from '@/entities/about/ui/ExperienceCard';

export const ExperienceSection = () => {
  return (
    <div className="mb-24">
      <div className="flex items-center gap-3 pb-4 mb-10 border-b border-slate-200 dark:border-slate-800">
        <Briefcase className="text-indigo-600 dark:text-indigo-400" size={28} />
        <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900 dark:text-white">Experience</h2>
      </div>

      <div className="space-y-12">
        {CAREERS.map((career) => (
          <ExperienceCard key={career.company} career={career} />
        ))}
      </div>
    </div>
  );
};
