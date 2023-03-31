import React, { useState, useEffect } from 'react';
import { getPostComments, deleteComment } from '../../api/posts';
import { Post } from '../../types/Post';
import { CommentsList } from '../CommentsList';
import { Comment } from '../../types/Comment';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasLoadingError, setLoadingError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setOpen(false);
    getPostComments(post.id)
      .then(data => setComments(data))
      .catch(
        () => setLoadingError(true),
      )
      .finally(
        () => {
          setLoading(false);
          setTimeout(
            () => setLoadingError(false), 10000,
          );
        },
      );
  }, [post.id]);

  const addCommentLocally = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const deleteOldComment = (id: number) => {
    setComments(
      (prevComments) => prevComments.filter(
        (comment) => comment.id !== id,
      ),
    );
    deleteComment(id)
      .catch(() => setLoadingError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {loading && (
            <Loader />
          )}
          {hasLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loading
            && !hasLoadingError
            && comments.length > 0
            && (
              <>
                <p className="title is-4">Comments:</p>
                <CommentsList
                  comments={comments}
                  onDelete={deleteOldComment}
                />
                {!isOpen ? (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setOpen(true)}
                  >
                    Write a comment
                  </button>
                ) : (
                  <NewCommentForm
                    postId={post.id}
                    onAdd={addCommentLocally}
                  />
                )}
              </>
            )}

          {!loading
            && !hasLoadingError
            && comments.length === 0
            && (
              <>
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
                {!isOpen ? (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setOpen(true)}
                  >
                    Write a comment
                  </button>
                ) : (
                  <NewCommentForm
                    postId={post.id}
                    onAdd={addCommentLocally}
                  />
                )}
              </>
            )}

        </div>
      </div>
    </div>
  );
};
