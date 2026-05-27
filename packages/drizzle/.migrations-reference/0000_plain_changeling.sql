-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."Role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "Category" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"parentId" text,
	"createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(6) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(6) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PostTag" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"tagId" text NOT NULL,
	"createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"avatarUrl" text NOT NULL,
	"homeUrl" text NOT NULL,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"githubId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "Post" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"contentUrl" text NOT NULL,
	"bannerImageUrl" text NOT NULL,
	"publishedAt" timestamp(6) with time zone NOT NULL,
	"createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(6) with time zone,
	"viewCount" integer DEFAULT 0,
	"likeCount" integer DEFAULT 0,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"isHidden" boolean DEFAULT false NOT NULL,
	"categoryId" text
);
--> statement-breakpoint
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "PostViewLog" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"ip" text NOT NULL,
	"date" date NOT NULL,
	"expiredAt" timestamp(6) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "PostViewLog" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "PostViewStats" (
	"id" text PRIMARY KEY NOT NULL,
	"postId" text NOT NULL,
	"date" date NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "PostViewStats" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Category"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PostViewLog" ADD CONSTRAINT "PostViewLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PostViewStats" ADD CONSTRAINT "PostViewStats_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "Category_parentId_idx" ON "Category" USING btree ("parentId" text_ops);--> statement-breakpoint
CREATE INDEX "Category_slug_idx" ON "Category" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Category_slug_key" ON "Category" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "Tag_name_idx" ON "Tag" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "PostTag_postId_idx" ON "PostTag" USING btree ("postId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "PostTag_postId_tagId_key" ON "PostTag" USING btree ("postId" text_ops,"tagId" text_ops);--> statement-breakpoint
CREATE INDEX "PostTag_tagId_idx" ON "PostTag" USING btree ("tagId" text_ops);--> statement-breakpoint
CREATE INDEX "Post_categoryId_idx" ON "Post" USING btree ("categoryId" text_ops);--> statement-breakpoint
CREATE INDEX "Post_publishedAt_idx" ON "Post" USING btree ("publishedAt" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Post_slug_key" ON "Post" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "PostViewLog_postId_ip_date_key" ON "PostViewLog" USING btree ("postId" date_ops,"ip" date_ops,"date" date_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "PostViewStats_postId_date_key" ON "PostViewStats" USING btree ("postId" date_ops,"date" date_ops);
*/