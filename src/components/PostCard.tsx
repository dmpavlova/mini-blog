import React, { useState, useEffect } from 'react';
import { deletePost, getComments, getReactions } from '../utils/localStorage';
import { Card, CardContent, Typography, Stack, Badge, CardActionArea, IconButton } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import CustomModal from './CustomModal';
import { Reaction, Post } from '../types/types';
import ConfirmDeletion from './ConfirmDeletion';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostCard: React.FC<PostCardProps> = ({ post, setPosts }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [reactions, setReactions] = useState<{ [key: number]: Reaction | null }>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedReactions = getReactions();
    setReactions(loadedReactions);
  }, []);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleViewClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleOpenConfirmDialog = () => {
    setPostToDelete(post.id);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postToDelete));
      setPostToDelete(null);
    }
    setShowConfirmDialog(false);
  };

  const getCommentCount = () => {
    const comments = getComments(post.id);
    return comments.length;
  };

  const truncate = (str: string, num: number): string => {
    if (str.length <= num) return str;
    return str.slice(0, num) + "...";
  };

  return (
    <>
      <Card>
        <CardContent>
          <CardActionArea onClick={() => handleViewClick(post.id)}>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body2" sx={{ marginTop: 3 }}>{truncate(post.content, 150)}</Typography>
          </CardActionArea>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", padding: 2 }}>
            <Badge badgeContent={getCommentCount()} color="primary">
              <SpeakerNotesOutlinedIcon color="action" />
            </Badge>
            <Badge 
              badgeContent={Object.values(Reaction).reduce((count, reaction) => 
                count + (reactions[post.id] === reaction ? 1 : 0), 0)} 
              color="primary"
            >
              <ThumbUpIcon color="action" />
            </Badge>
            <IconButton size="small" sx={{ marginLeft: 1 }} onClick={handleEditClick}>
              <BorderColorOutlinedIcon />
            </IconButton>
            <IconButton size="small" sx={{ marginLeft: 1 }} onClick={handleOpenConfirmDialog}>
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
      <CustomModal open={showEditForm} onClose={() => setShowEditForm(false)} postId={post.id} />
      <ConfirmDeletion 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)} 
        onConfirm={handleDelete} 
      />
    </>
  );
};

export default PostCard;