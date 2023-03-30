import { Post } from '../../types/Post';
import { PostItem } from '../PostItem/PostItem';

type Props = {
  posts: Post[],
  onSelect: (id: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = (
  {
    posts,
    onSelect,
    selectedPostId,
  },
) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts.map((post: Post) => (
          <PostItem
            post={post}
            key={post.id}
            onSelect={onSelect}
            selectedPostId={selectedPostId}
          />
        ))}
      </tbody>
    </table>
  </div>
);
