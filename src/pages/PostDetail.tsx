import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPosts, deletePost, getComments, deleteComment } from '../utils/localStorage'; 
import { Post, Comment } from '../utils/localStorage'; 
import { Button, Typography, Stack, List, ListItem, ListItemText } from '@mui/material';
import CustomModal from '../components/CustomModal';
import CommentForm from '../components/CommentForm';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const postId = Number(id); 
  const [post, setPost] = useState<Post | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const posts = getPosts();
    const foundPost = posts.find(p => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    }
    const loadedComments = getComments(postId); 
    setComments(loadedComments);
  }, [postId]);

  const navigate = useNavigate();

  const handleDelete = () => {
    deletePost(postId);
    navigate('/');
  };

  const handleCommentAdded = () => {
    const updatedComments = getComments(postId);
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
    const updatedComments = getComments(postId);
    setComments(updatedComments);
  };

  return (
    <Stack spacing={3} sx={{ padding: 12 }}>
      {post ? (
        <>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
          
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => setShowEditForm(true)}>
              Редактировать пост
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить пост
            </Button>
          </Stack>
          
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

          <Typography variant="h5">Комментарии</Typography>
          <List>
            {comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(comment => (
              <ListItem key={comment.id}>
                <ListItemText 
                  primary={<strong>{comment.author}</strong>} 
                  secondary={comment.text} 
                />
                <Button color="error" onClick={() => handleDeleteComment(comment.id)}>Удалить</Button>
              </ListItem>
            ))}
          </List>
          
          <Button component={Link} to="/" color="primary">
            Назад к списку постов
          </Button>

          <CustomModal open={showEditForm} onClose={() => setShowEditForm(false)} postId={postId} />
        </>
      ) : (
        <Typography variant="body1">Пост не найден.</Typography>
      )}
    </Stack>
  );
};

export default PostDetail;

