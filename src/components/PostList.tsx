import React, { useState, useEffect } from 'react';
import { Post, deletePost, getComments, getReactions } from '../utils/localStorage';
import { Card, CardContent, Typography, Grid, IconButton, Stack, Badge, CardActionArea } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { Reaction } from '../utils/localStorage';
import ConfirmDeletion from '../components/ConfirmDeletion';



interface PostListProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [reactions, setReactions] = useState<{ [key: number]: Reaction | null }>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  useEffect(() => {
    const loadedReactions = getReactions();
    setReactions(loadedReactions);
  }, []);

  const handleEditClick = (id: number) => {
    setPostId(id);
    setShowEditForm(true);
  };

  const handleViewClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleOpenConfirmDialog = (postId: number) => {
    setPostToDelete(postId);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      setPostToDelete(null);
    }
    setShowConfirmDialog(false);
  };

  const getCommentCount = (postId: number) => {
    const comments = getComments(postId);
    return comments.length;
  };

  
  if (posts.length === 0) {
    return <Typography variant="body1">Нет доступных постов.</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid size={4} key={post.id}>
            <Card>
              <CardContent>
                <CardActionArea onClick={() => handleViewClick(post.id)}>
                  <Typography variant="h4">{post.title}</Typography>
                  <Typography variant="body2">{post.content.slice(0, 150) + "..."}</Typography>
                </CardActionArea>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                  <Badge badgeContent={getCommentCount(post.id)} color="primary">
                    <SpeakerNotesOutlinedIcon color="action" />
                  </Badge>                  
                  <Badge 
                      badgeContent={Object.values(Reaction).reduce((count, reaction) => 
                        count + (reactions[post.id] === reaction ? 1 : 0), 0)} 
                      color="primary"
                    >
                      <ThumbUpIcon color="action" />
                    </Badge>
                  <IconButton size="small" sx={{ marginLeft: 1 }} onClick={() => handleEditClick(post.id)}>
                    <BorderColorOutlinedIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ marginLeft: 1 }} onClick={() => handleOpenConfirmDialog(post.id)}>
                    <DeleteOutlined />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CustomModal open={showEditForm} onClose={() => setShowEditForm(false)} postId={postId} />
      <ConfirmDeletion 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
};

export default PostList;