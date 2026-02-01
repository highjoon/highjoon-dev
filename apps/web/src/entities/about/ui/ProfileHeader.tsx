import Image from 'next/image';

import { PROFILE, SOCIAL_LINKS } from '@/entities/about/model/profile';
import { SocialLinkButton } from '@/entities/about/ui/SocialLinkButton';

export const ProfileHeader = () => {
  return (
    <div className="mb-20 text-center">
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 blur-lg opacity-70 animate-pulse"></div>
        <div className="relative w-full h-full overflow-hidden border-4 border-white rounded-full dark:border-slate-900">
          <Image src={PROFILE.image.src} alt={PROFILE.image.alt} fill className="object-cover" />
        </div>
      </div>

      <h1 className="mb-6 text-5xl font-black tracking-tight md:text-6xl text-slate-900 dark:text-white">
        {PROFILE.name}
      </h1>
      <p className="max-w-2xl mx-auto mb-2 text-xl font-bold leading-relaxed md:text-2xl text-slate-600 dark:text-slate-300">
        {PROFILE.role}
      </p>
      <p className="mb-8 text-sm text-slate-400 dark:text-slate-500">{PROFILE.location}</p>

      {PROFILE.taglines.map((tagline, index) => (
        <p
          key={index}
          className={`max-w-2xl mx-auto text-xl font-bold leading-relaxed md:text-2xl text-slate-600 dark:text-slate-300 ${
            index === PROFILE.taglines.length - 1 ? 'mb-8' : 'mb-2'
          }`}>
          {tagline.prefix}
          <span
            className={
              tagline.highlight === 'indigo'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-pink-600 dark:text-pink-400'
            }>
            {tagline.text}
          </span>
          {tagline.suffix}
        </p>
      ))}

      <div className="flex justify-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <SocialLinkButton key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
};
