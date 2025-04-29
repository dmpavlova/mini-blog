import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList'; 
import { getPosts, Post } from '../utils/localStorage';
import { Button, Typography, Stack } from '@mui/material';
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
      <Stack sx={{padding: 12}}>
      <PostList posts={posts} setPosts={setPosts} />
      </Stack>
      <CustomModal open={showModal} onClose={() => setShowModal(false)} postId={postId} />
    </Stack>
  );
};

export default Home;