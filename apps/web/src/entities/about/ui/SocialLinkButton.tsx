import type { SocialLink } from '@/entities/about/model/profile';

type Props = SocialLink;

export const SocialLinkButton = ({ href, label, icon: Icon, isExternal }: Props) => {
  return (
    <a
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className="flex items-center gap-2 px-3 py-1 font-bold transition-colors border sm:px-5 sm:py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800">
      <Icon size={18} /> {label}
    </a>
  );
};
