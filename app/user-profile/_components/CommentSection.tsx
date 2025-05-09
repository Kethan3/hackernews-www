import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  content: string;
  postId: string;
  postTitle: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection = ({ comments }: CommentSectionProps) => {
  const router = useRouter();

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className="bg-muted rounded p-4 mb-4 cursor-pointer" onClick={() => handlePostClick(comment.postId)}>
          <p>{comment.content}</p>
          <p className="text-sm text-muted-foreground">Commented on "{comment.postTitle}" on {new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
