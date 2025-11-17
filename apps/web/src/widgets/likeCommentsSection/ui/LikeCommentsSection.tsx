import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import LikeButton from '@/features/likePost/ui/LikeButton';
import CommentSection from '@/widgets/commentSection/ui/CommentSection';

type Props = {
  post: Post;
};

export default function LikeCommentsSection({ post }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-5">
      <LikeButton postId={post.id} likeCount={post.likeCount} slug={post.slug} />
      <CommentSection postId={post.id} />
    </div>
  );
}
