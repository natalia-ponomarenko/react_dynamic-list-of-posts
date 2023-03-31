import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem';

type Props = {
  comments: Comment[],
  onDelete: (id: number) => void,
};

export const CommentsList:React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      {comments.map((comment: Comment) => (
        <CommentItem
          {...comment}
          onDelete={onDelete}
          key={comment.id}
        />
      ))}
    </>
  );
};
