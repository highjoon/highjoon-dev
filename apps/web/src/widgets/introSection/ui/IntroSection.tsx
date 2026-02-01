import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Code, Sparkles } from 'lucide-react';

import { ROUTES } from '@/shared/routes/routes';

export default function IntroSection() {
  return (
    <section className="pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 shadow-2xl">
          {/* 백그라운드 영역 */}
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none bg-gradient-to-l from-indigo-500/20 to-transparent" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-12 p-8 md:p-16 md:flex-row">
            {/* 컨텐츠 영역 */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 mb-8 space-x-2 text-xs font-bold text-indigo-300 border rounded-full bg-white/10 backdrop-blur-md border-white/10">
                <Sparkles size={14} />
                <span>Frontend Engineer</span>
              </div>

              <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                  HIGHJOON
                </span>
              </h1>

              <p className="max-w-2xl mb-10 text-lg font-medium leading-relaxed text-slate-400 md:text-xl">
                재미있게 개발하고 싶어요
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Link href={ROUTES.ABOUT}>
                  <button className="flex items-center justify-center w-full px-8 py-4 space-x-2 text-lg font-black transition-all bg-white shadow-xl cursor-pointer sm:w-auto text-slate-900 rounded-2xl hover:bg-indigo-50 active:scale-95">
                    <span>About me</span>
                    <ChevronRight size={20} />
                  </button>
                </Link>
              </div>
            </div>

            {/* 프로필 영역 */}
            <div className="relative flex shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-slate-800 rounded-[2.5rem] overflow-hidden border-2 border-slate-700 shadow-2xl">
                <Image src="/images/img-profile.png" fill alt="profile" />
                <div className="absolute inset-0 flex items-center justify-center" />

                {/* 코드 뱃지 */}
                <div className="absolute p-4 transition-transform duration-500 transform bg-white shadow-xl bottom-6 right-6 rounded-2xl rotate-12 group-hover:rotate-0">
                  <Code size={24} className="text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
