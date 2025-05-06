import React, { useEffect, useState } from 'react';
import { savePosts, getPosts } from '../utils/localStorage'; 
import { Button, TextField, Box, Stack, Typography } from '@mui/material';

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostForm: React.FC<{ postId?: number; onClose: () => void }> = ({ postId, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (postId) {
      const posts = getPosts();
      const post = posts.find((p: Post) => p.id === postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    } else {
      setTitle('');
      setContent('');
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const posts = getPosts();
    
    if (postId) {
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, title, content } : post
      );
      savePosts(updatedPosts);
    } else {
      const newPost = { id: Date.now(), title, content };
      savePosts([...posts, newPost]);
    }

    onClose(); 
  };

  return (    
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        width: "95%",
        maxWidth: 550,
        borderRadius: 1,
        bgcolor: '#eeeeee',
        padding: 2,
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}> 
        <TextField
          required
          id="outlined-required"
          label="Заголовок:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-textarea"
          label="Содержание:"
          multiline
          rows={5}
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setContent(e.target.value);
            }
          }}
          required
        />
        <Typography variant="body2" color="textSecondary">
          {`${content.length} / 500`}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="flex-end"> 
          <Button type="submit" variant='outlined'>{postId ? 'Сохранить' : 'Добавить'}</Button>
          <Button type="button" onClick={onClose} variant='outlined'>Закрыть</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PostForm;
