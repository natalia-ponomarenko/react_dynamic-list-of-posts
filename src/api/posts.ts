import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPostComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const addComment = (newComment: CommentData) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};
