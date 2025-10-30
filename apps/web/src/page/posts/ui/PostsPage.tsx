import React from 'react';
import Image from 'next/image';
import { Card } from '@highjoon-dev/ui/components/Card';
import { ArrowRight } from 'lucide-react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { createPostPath, POSTS_PER_PAGE } from '@/entities/post/lib/post';
import PostsSchema from '@/entities/post/lib/PostsSchema';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { id: string };
}

export default async function PostsPage({ params }: Props) {
  const postList = await getAllPostsApi(serverApi);
  const currentPage = Number(params.id);
  const totalPage = Math.ceil(postList.length / POSTS_PER_PAGE);
  const blogPosts = postList.slice((currentPage - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * currentPage);

  const mappedPosts = blogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    summary: post.description,
    label: post.category ?? 'Post',
    published: new Date(post.publishedAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    url: createPostPath(post.slug),
    image: post.bannerImageUrl,
    tags: post.category ? [post.category] : [],
  }));

  return (
    <>
      <PostsSchema posts={blogPosts} pageNumber={currentPage} />
      <section className="py-2 md:py-4 lg:py-8">
        <div className="container flex flex-col items-center gap-16">
          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {mappedPosts.map((post) => (
              <Card
                key={post.id}
                className="order-last bg-transparent border-0 shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2">
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <div className="mb-4 md:mb-6">
                      <div className="flex flex-wrap gap-3 text-xs tracking-wider uppercase text-muted-foreground md:gap-5 lg:gap-6">
                        {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <h3 className="max-w-full text-xl font-semibold break-words md:text-2xl lg:text-3xl">
                      <a href={post.url} className="inline-block max-w-full break-words align-top hover:underline">
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-4 text-muted-foreground md:mt-5">{post.summary}</p>
                    <div className="flex items-center mt-6 space-x-4 text-sm md:mt-8">
                      <span className="text-muted-foreground">{post.published}</span>
                    </div>
                    <div className="flex items-center mt-6 space-x-2 md:mt-8">
                      <a
                        href={post.url}
                        className="inline-flex items-center font-semibold hover:underline md:text-base">
                        <span>Read more</span>
                        <ArrowRight className="ml-2 transition-transform size-4" />
                      </a>
                    </div>
                  </div>
                  <div className="order-first sm:order-last sm:col-span-5">
                    <a href={post.url} className="block">
                      <div className="aspect-[16/9] overflow-clip rounded-lg border border-border relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 1024px) 640px, (min-width: 640px) 480px, 100vw"
                          className="object-cover transition-opacity duration-200 hover:opacity-70"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full mt-8">
            <Pagination currentPage={currentPage} totalPage={totalPage} routerPath={`${ROUTES.PAGES}`} />
          </div>
        </div>
      </section>
    </>
  );
}
