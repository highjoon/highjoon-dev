-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Post_categoryId_idx" ON "Post"("categoryId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 시드: 대분류 카테고리 3개
INSERT INTO "Category" ("id", "slug", "name", "parentId", "updatedAt") VALUES
  (gen_random_uuid()::text, 'frontend',      '프론트엔드', NULL, NOW()),
  (gen_random_uuid()::text, 'infra',         '인프라',     NULL, NOW()),
  (gen_random_uuid()::text, 'retrospective', '회고',       NULL, NOW());

-- 시드: 소분류 카테고리 3개 (frontend 하위)
INSERT INTO "Category" ("id", "slug", "name", "parentId", "updatedAt")
SELECT gen_random_uuid()::text, v.slug, v.name,
       (SELECT id FROM "Category" WHERE slug = 'frontend'), NOW()
FROM (VALUES
  ('react',         'React'),
  ('react-query',   'React Query'),
  ('design-system', '디자인 시스템')
) AS v(slug, name);

-- backfill: react-query 시리즈 15편
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'react-query')
WHERE "slug" IN (
  '1-practical-react-query','2-react-query-data-transformations',
  '3-react-query-render-optimizations','4-status-checks-in-react-query',
  '5-testing-react-query','6-react-query-and-typescript',
  '7-using-websockets-with-react-query','8-effective-react-query-keys',
  '8a-leveraging-the-query-function-context',
  '9-placeholder-and-initial-data-in-react-query',
  '10-react-query-as-a-state-manager','11-react-query-error-handling',
  '12-mastering-mutations-in-react-query','13-offline-react-query',
  '14-react-query-and-forms'
);

-- backfill: react 3편
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'react')
WHERE "slug" IN (
  'flexible-and-reusable-modals','nextjs-flickering-trouble-shooting',
  'css-in-react-server-components'
);

-- backfill: design-system 3편
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'design-system')
WHERE "slug" IN (
  'building-a-design-system-in-a-startup','spectrum-design-tokens',
  'component-level-design-tokens-are-they-worth-it'
);

-- backfill: frontend 직속 1편 (HLS)
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'frontend')
WHERE "slug" = 'exploring-hls';

-- backfill: infra 3편
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'infra')
WHERE "slug" IN (
  'dns-nxdomain-error-troubleshooting','i18n-automation-pipeline','cra-to-vite-migration'
);

-- backfill: retrospective 2편
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE slug = 'retrospective')
WHERE "slug" IN ('2024-retrospective','2025-retrospective');
