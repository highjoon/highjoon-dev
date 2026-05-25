import { Metadata } from 'next';

import { categoryService } from '@/entities/category/services/category.service';

interface CategoryDetailParams {
  params: Promise<{ slug: string; page: string }>;
}

export const generateCategoryDetailMetadata = async ({
  params: paramsPromise,
}: CategoryDetailParams): Promise<Metadata> => {
  const params = await paramsPromise;
  const slug = decodeURIComponent(params.slug);
  const pageNumber = Number(params.page);

  const response = await categoryService.findCategoryBySlug(slug);
  const category = response.data;

  const breadcrumb = category?.parent ? `${category.parent.name} · ${category.name}` : (category?.name ?? slug);
  const title = `${breadcrumb} - ${pageNumber}페이지 | highjoon-dev`;
  const description = `${breadcrumb} 카테고리 게시물 목록`;
  const url = `https://highjoon-dev.com/categories/${encodeURIComponent(slug)}/${pageNumber}`;

  return {
    title,
    description,
    keywords: [breadcrumb, 'highjoon-dev', '블로그', '카테고리'],
    openGraph: {
      title,
      description,
      type: 'website',
      url,
    },
    alternates: {
      canonical: url,
    },
  };
};
