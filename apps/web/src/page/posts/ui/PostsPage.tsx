import React from 'react';
import Image from 'next/image';
import { Card } from '@highjoon-dev/ui/components/Card';
import { ArrowRight } from 'lucide-react';

import { getAllPostsApi } from '@/entities/post/api/getAllPostsApi';
import { PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { createPostPath, POSTS_PER_PAGE } from '@/entities/post/lib/post';
import PostsSchema from '@/entities/post/lib/PostsSchema';
import TagBadgeList from '@/entities/tag/ui/TagBadgeList';
import { serverApi } from '@/shared/api/apiClient/serverApi';
import { ROUTES } from '@/shared/routes/routes';
import Pagination from '@/widgets/ui/Pagination';

interface Props {
  params: { id: string };
}

export default async function PostsPage({ params }: Props) {
  const currentPage = Number(params.id);
  const { posts, meta } = await getAllPostsApi(serverApi, {
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
  });

  const blogPosts = posts as PostWithTags[];
  const totalPage = Math.ceil(meta.total / POSTS_PER_PAGE);

  return (
    <>
      <PostsSchema posts={blogPosts} pageNumber={currentPage} />
      <section className="py-2 md:py-4 lg:py-8">
        <div className="container flex flex-col items-center gap-16">
          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="order-last bg-transparent border-0 shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2">
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    <h3 className="max-w-full text-xl font-semibold break-words md:text-2xl lg:text-3xl">
                      <a
                        href={createPostPath(post.slug)}
                        className="inline-block max-w-full break-words align-top hover:underline">
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-4 text-muted-foreground md:mt-5">{post.description}</p>
                    <TagBadgeList
                      tags={post.postTags?.map((pt) => pt.tag) || []}
                      variant="secondary"
                      className="mt-4"
                    />
                    <div className="flex items-center mt-6 space-x-4 text-sm md:mt-8">
                      <span className="text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center mt-6 space-x-2 md:mt-8">
                      <a
                        href={createPostPath(post.slug)}
                        className="inline-flex items-center font-semibold hover:underline md:text-base">
                        <span>Read more</span>
                        <ArrowRight className="ml-2 transition-transform size-4" />
                      </a>
                    </div>
                  </div>
                  <div className="order-first sm:order-last sm:col-span-5">
                    <a href={createPostPath(post.slug)} className="block">
                      <div className="aspect-[16/9] overflow-clip rounded-lg border border-border relative">
                        <Image
                          src={post.bannerImageUrl}
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
