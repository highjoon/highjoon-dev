create table "Tag" (
  "id" text primary key,
  "name" text not null unique,
  "createdAt" timestamptz(6) not null default now(),
  "updatedAt" timestamptz(6) not null default now()
);

create index "Tag_name_idx" on "Tag" ("name");

create table "Category" (
  "id" text primary key,
  "slug" text not null unique,
  "name" text not null,
  "parentId" text references "Category" ("id") on delete restrict,
  "createdAt" timestamptz(6) not null default now(),
  "updatedAt" timestamptz(6) not null default now()
);

create index "Category_parentId_idx" on "Category" ("parentId");
create index "Category_slug_idx" on "Category" ("slug");

create table "Post" (
  "id" text primary key,
  "slug" text not null unique,
  "title" text not null,
  "description" text not null,
  "contentUrl" text not null,
  "bannerImageUrl" text not null,
  "publishedAt" timestamptz(6) not null,
  "categoryId" text references "Category" ("id") on delete set null,
  "createdAt" timestamptz(6) default now(),
  "updatedAt" timestamptz(6) default now(),
  "viewCount" integer default 0,
  "isFeatured" boolean not null default false,
  "isHidden" boolean not null default false
);

create index "Post_publishedAt_idx" on "Post" ("publishedAt");
create index "Post_categoryId_idx" on "Post" ("categoryId");

create table "PostTag" (
  "id" text primary key,
  "postId" text not null references "Post" ("id") on delete cascade,
  "tagId" text not null references "Tag" ("id") on delete cascade,
  "createdAt" timestamptz(6) not null default now(),
  unique ("postId", "tagId")
);

create index "PostTag_postId_idx" on "PostTag" ("postId");
create index "PostTag_tagId_idx"  on "PostTag" ("tagId");

create table "PostViewStats" (
  "id" text primary key,
  "postId" text not null references "Post" ("id") on delete cascade,
  "date" date not null,
  "viewCount" integer not null default 0,
  unique("postId", "date")
);

create table "PostViewLog" (
  "id" text primary key,
  "postId" text not null references "Post" ("id") on delete cascade,
  "ip" text not null,
  "date" date not null,
  "expiredAt" timestamptz(6) not null,
  unique ("postId", "ip", "date")
);