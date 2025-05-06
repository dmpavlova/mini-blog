import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { addComment } from '../utils/localStorage';
import { Comment } from '../types/types';

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: Date.now(),
      author,
      text,
      postId,
      date: new Date().toISOString(),
    };
    addComment(newComment);
    onCommentAdded();
    setAuthor('');
    setText('');
  };

  return (
    <Box 
    component="form" 
    onSubmit={handleSubmit} 
    sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column', width: '50vw', gap: '10px' }}
    >
      <TextField
        required
        label="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <TextField
        required
        label="Комментарий"
        multiline
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button type="submit" variant="contained">Добавить комментарий</Button>
    </Box>
  );
};

export default CommentForm;