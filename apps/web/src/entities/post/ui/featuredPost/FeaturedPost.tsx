import React from 'react';

import { getFeaturedPostApi } from '@/entities/post/api/getFeaturedPostApi';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function FeaturedPost() {
  const featuredPost = await getFeaturedPostApi(serverApi);

  return (
    <section className="flex flex-col gap-8 mb-24" aria-labelledby="featured-post-title">
      <div className="flex items-center gap-4">
        <h2 id="featured-post-title" className="text-sm font-black tracking-widest uppercase text-vibrant-brand">
          Featured Insight
        </h2>
        <div className="flex-grow h-px bg-vibrant-border-color"></div>
      </div>
      <div className="p-0 m-0 list-none">
        <div className="relative p-8 transition-all duration-500 bg-white border shadow-sm group md:p-12 rounded-vibrant-lg border-vibrant-border-color hover:border-vibrant-brand-light hover:shadow-vibrant">
          <div className="absolute -inset-1 bg-gradient-to-r from-vibrant-brand to-vibrant-design rounded-[2.6rem] blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
          <div className="relative flex flex-col items-center gap-12 md:flex-row">
            <div className="w-full md:w-2/3">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-black tracking-widest uppercase rounded-lg text-vibrant-brand bg-vibrant-brand-light">
                Must Read
              </span>
              <h3 className="mb-6 text-2xl font-black leading-tight transition-colors md:text-4xl text-vibrant-text-main group-hover:text-vibrant-brand">
                {featuredPost.title}
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-vibrant-text-muted">{featuredPost.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                {featuredPost.publishedAt && (
                  <span className="text-vibrant-text-muted">
                    {new Date(featuredPost.publishedAt)
                      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                      .replace(/\//g, '.')}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full text-center transition-all duration-500 scale-90 md:w-1/3 text-8xl grayscale group-hover:grayscale-0 group-hover:scale-100">
              💻
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
