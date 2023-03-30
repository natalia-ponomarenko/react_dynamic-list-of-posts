import { Post } from '../../types/Post';

type Props = {
  post: Post,
  onSelect: (id: number) => void,
  selectedPostId: number,
};

export const PostItem:React.FC<Props> = (
  {
    post,
    onSelect,
    selectedPostId,
  },
) => {
  const { id, title } = post;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        {selectedPostId === id ? (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={() => onSelect(0)}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            data-cy="PostButton"
            className="button is-light is-link"
            onClick={() => onSelect(id)}
          >
            Open
          </button>
        ) }
      </td>
    </tr>
  );
};
