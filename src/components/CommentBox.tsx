import { useRef, useState } from 'react';
import { submitComments } from '../services/commentservices';
import toast from 'react-hot-toast';

interface CommentBoxProps {
  issueId: string;
  fetchComments: () => void;
}

const CommentBox = ({ issueId, fetchComments }: CommentBoxProps) => {
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      setLoading(true);
      const res = await submitComments(comment, issueId);
      if (res.data.success) {
        toast.success(res.data.message);
        setComment('');
        fetchComments();
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-moonstone rounded-md border-3 border-dotted border-slate-300 p-2"
      onClick={() => textAreaRef.current?.focus()}
    >
      <div
        className="flex w-full flex-col items-end justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <textarea
          name="comment"
          ref={textAreaRef}
          value={comment}
          disabled={loading}
          onChange={(e) => setComment(e.target.value)}
          className="h-32 w-full resize-none appearance-none outline-none md:h-60"
        />
        <button
          className="bg-secondary cursor-pointer rounded-md px-4 py-2 text-sm text-white"
          disabled={loading}
          onClick={handleCommentSubmit}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
