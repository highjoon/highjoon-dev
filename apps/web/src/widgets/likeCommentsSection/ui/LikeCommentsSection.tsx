import React from 'react';
import { Post } from '@highjoon-dev/prisma';
import { MessageSquare } from 'lucide-react';

import InteractionBar from '@/entities/post/ui/postDetail/InteractionBar';
import CommentSection from '@/widgets/commentSection/ui/CommentSection';

type Props = {
  post: Post;
};

export default function LikeCommentsSection({ post }: Props) {
  return (
    <div className="flex flex-col">
      <InteractionBar postId={post.id} likeCount={post.likeCount} slug={post.slug} />

      <div className="mb-20">
        <h3 className="flex items-center gap-3 mb-8 text-2xl font-black text-vibrant-text-main">
          <MessageSquare className="text-vibrant-brand" />
          Comments
        </h3>
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
