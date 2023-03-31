type Props = {
  id: number,
  email: string,
  name: string,
  body: string,
  onDelete: (id: number) => void,
};

export const CommentItem: React.FC<Props> = (
  {
    id,
    body,
    email,
    name,
    onDelete,
  },
) => {
  return (
    <article
      className="message is-small"
      data-cy="Comment"
      key={id}
    >
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
};

export default CommentItem;
