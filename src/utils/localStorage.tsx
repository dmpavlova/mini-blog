export interface Post {
  id: number;
  title: string;
  content: string;
  likes?: number;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  postId: number;
  date: string;
}

export const getPosts = (): Post[] => {
  const storedPosts = localStorage.getItem('posts');
  return storedPosts ? JSON.parse(storedPosts) : [];
};

export const savePosts = (posts: Post[]) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

export const deletePost = (postId: number) => {
  const posts = getPosts();
  const updatedPosts = posts.filter(post => post.id !== postId);
  savePosts(updatedPosts);
};

export const addComment = (newComment: Comment) => {
    const comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));
};

export const getComments = (postId: number): Comment[] => {
  const comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
  return comments.filter((comment: Comment) => comment.postId === postId);
};

export const deleteComment = (commentId: number) => {
  const comments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
  const updatedComments = comments.filter(comment => comment.id !== commentId);
  localStorage.setItem('comments', JSON.stringify(updatedComments));
};