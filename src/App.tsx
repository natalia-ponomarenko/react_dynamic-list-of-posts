import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts, getUsers } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { PostsList } from './components/PostList';
import { NoPostsNotification } from './components/NoPostsNotification';
import { LoadingError } from './components/LoadingError';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasLoadingError, setLoadingError] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setLoadingError(true));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      getUserPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setLoadingError(true))
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  const selectUser = (person: User) => {
    const userFound = users.find(
      (user) => user.id === person.id,
    );

    setSelectedUser(userFound);
  };

  const selectPost = (id: number) => {
    const foundPost = posts.find((post) => post.id === id);

    setSelectedPostId(id);
    setSelectedPost(foundPost);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={selectUser}
                  selectedUser={selectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {loading && (
                  <Loader />
                )}
                {selectedUser
                && posts.length > 0
                && !loading && (
                  <PostsList
                    posts={posts}
                    onSelect={selectPost}
                    selectedPostId={selectedPostId}
                  />
                )}
                {selectedUser
                && posts.length === 0
                && !loading && (
                  <NoPostsNotification />
                )}
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {hasLoadingError && (
                  <LoadingError />
                )}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar', {
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId !== 0 && selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
