import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface PostSectionProps {
  posts: Post[];
}

const PostSection = ({ posts }: PostSectionProps) => {
  const router = useRouter();

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="bg-muted rounded p-4 mb-4 cursor-pointer" onClick={() => handlePostClick(post.id)}>
          <h4 className="font-semibold text-lg">{post.title}</h4>
          <p>{post.content}</p>
          <p className="text-sm text-muted-foreground">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PostSection;
