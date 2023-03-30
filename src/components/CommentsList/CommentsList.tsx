import { Comment } from '../../types/Comment';

type Props = {
  comments: Comment[],
  onDelete: (id: number) => void,
};

export const CommentsList:React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      {comments.map((comment: Comment) => {
        const {
          id, name, body, email,
        } = comment;

        return (
          <article className="message is-small" data-cy="Comment" key={id}>
            <div className="message-header">
              <a href={`mailto:${email}`} data-cy="CommentAuthor">
                {name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => onDelete(id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {body}
            </div>
          </article>
        );
      }) }
    </>
  );
};
