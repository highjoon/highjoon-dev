import PostCard from './PostCard';

const PostList = () => {
  return (
    <ol className="flex flex-col gap-5">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </ol>
  );
};

export default PostList;
