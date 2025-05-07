import { useEffect, useState } from "react";
import type { FC } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getPosts,
  deletePost,
  getComments,
  deleteComment,
  saveReactions,
  getReactions,
} from "../utils/localStorage";
import { Post, Comment, Reaction } from "../types/types";
import {
  IconButton,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import CustomModal from "../components/CustomModal";
import CommentForm from "../components/CommentForm";
import ReactionBar from "../components/ReactionBar";
import ConfirmDeletion from "../components/ConfirmDeletion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserIcon from "@mui/icons-material/Person";
import { format } from "date-fns";

const PostDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const [post, setPost] = useState<Post | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<{
    [key: number]: Reaction | null;
  }>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const posts = getPosts();
    const foundPost = posts.find((p) => p.id === postId);
    if (foundPost) {
      setPost(foundPost);
    }
  
    const loadedComments = getComments(postId);
    setComments(loadedComments);
  
    const loadedReactions = getReactions();
    setReactions(loadedReactions);
  
    if (window.location.hash === '#comments') {
      setTimeout(() => {
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [postId]);

  const navigate = useNavigate();

  const handleDelete = () => {
    deletePost(postId);
    navigate("/");
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

  const handleReactionSelect = (reaction: Reaction) => {
    const currentReaction = reactions[postId];
    const newReaction = currentReaction === reaction ? null : reaction;

    const updatedReactions: { [key: number]: Reaction | null } = {
      ...reactions,
      [postId]: newReaction,
    };

    setReactions(updatedReactions);
    saveReactions(updatedReactions);
  };

  return (
    <Stack spacing={3} sx={{ padding: 12, width: "70vw", margin: "auto" }}>
      {post ? (
        <>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <IconButton component={Link} to="/">
              <ArrowBackIcon />
            </IconButton>
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => setShowEditForm(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => setShowConfirmDialog(true)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>

          <Typography variant="h5">Реакции</Typography>
          <ReactionBar
            postId={post.id}
            selectedReaction={reactions[postId]}
            onReactionSelect={handleReactionSelect}
            reactionCounts={Object.values(Reaction).reduce((acc, reaction) => {
              acc[reaction] = reactions[postId] === reaction ? 1 : 0;
              return acc;
            }, {} as { [key in Reaction]: number })}
          />

          <Typography variant="h5" id="comments-section">
            Комментарии ({comments.length})
          </Typography>
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
          <List>
            {comments
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((comment) => (
                <ListItem key={comment.id}>
                  <Avatar>
                    <UserIcon />
                  </Avatar>
                  <ListItemText
                    primary={<strong>{comment.author}</strong>}
                    secondary={
                      <>
                        {comment.text}
                        <br />
                        <span>
                          {format(new Date(comment.date), "dd.MM.yyyy HH:mm")}
                        </span>{" "}
                      </>
                    }
                    sx={{ ml: 2 }}
                  />
                  <IconButton onClick={() => handleDeleteComment(comment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
          </List>

          <CustomModal
            open={showEditForm}
            onClose={() => setShowEditForm(false)}
            postId={postId}
          />
          <ConfirmDeletion
            open={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleDelete}
          />
        </>
      ) : (
        <Typography variant="body1">Пост не найден.</Typography>
      )}
    </Stack>
  );
};

export default PostDetail;
