import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard'; 
import { getPosts, Post } from '../utils/localStorage';
import { Button, Typography, Stack, Grid } from '@mui/material';
import CustomModal from '../components/CustomModal';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const savedPosts = getPosts();
    console.log('Загруженные посты:', savedPosts);
    setPosts(savedPosts);
  }, []);

  const handleCreatePost = () => {
    setPostId(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    const updatedPosts = getPosts();
    setPosts(updatedPosts);
  };

  return (
    <Stack 
      direction="column"
      spacing={12}
      sx={{
        height: '100vh', 
        paddingTop: 2,
        backgroundColor: "#F1EFEC",
      }}>      
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          backgroundColor: '#fff',
          padding: 2,
        }}
      >
        <Typography variant="h5" gutterBottom color='#3D90D7'>
          Мини-блог
        </Typography>
        <Button variant="contained" onClick={handleCreatePost}>+ Создать пост</Button>
      </Stack>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {posts.map(post => (
          <Grid key={post.id} size={{ xs: 12, md: 4 }}>
            <PostCard post={post} setPosts={setPosts} />
          </Grid>
        ))}
      </Grid>
      <CustomModal open={showModal} onClose={handleModalClose} postId={postId} />
    </Stack>
  );
};

export default Home;