-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "bannerImageUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMPTZ(6) NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "viewCount" INTEGER DEFAULT 0,
    "likeCount" INTEGER DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostViewStats" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostViewStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_publishedAt_idx" ON "Post"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PostViewStats_postId_date_key" ON "PostViewStats"("postId", "date");

-- AddForeignKey
ALTER TABLE "PostViewStats" ADD CONSTRAINT "PostViewStats_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
