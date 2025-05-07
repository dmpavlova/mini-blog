import { useState, useEffect } from "react";
import type { FC } from "react";
import { deletePost, getComments, getReactions } from "../utils/localStorage";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Badge,
  CardActionArea,
  IconButton,
  Tooltip,
} from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import CustomModal from "./CustomModal";
import { Reaction, PostCardProps } from "../types/types";
import ConfirmDeletion from "./ConfirmDeletion";
import { useNavigate } from "react-router-dom";
import ReactionBar from "./ReactionBar";

const PostCard: FC<PostCardProps> = ({ post, setPosts }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [reactions, setReactions] = useState<{
    [key: number]: Reaction | null;
  }>({});
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

  const handleCommentClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.stopPropagation();
    navigate(`/post/${postId}#comments`);
  };

  const handleOpenConfirmDialog = () => {
    setPostToDelete(post.id);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postToDelete));
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

  const reactionCounts = Object.values(Reaction).reduce((acc, reaction) => {
    acc[reaction] = reactions[post.id] === reaction ? 1 : 0;
    return acc;
  }, {} as { [key in Reaction]: number });

  return (
    <>
      <CardActionArea onClick={() => handleViewClick(post.id)}>
        <Card>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body2" sx={{ marginTop: 3 }}>
              {truncate(post.content, 150)}
            </Typography>

            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
              }}
            >
              <IconButton onClick={(e) => handleCommentClick(e, post.id)}>
                <Badge badgeContent={getCommentCount()} color="primary">
                  <SpeakerNotesOutlinedIcon color="action" />
                </Badge>
              </IconButton>
              <Tooltip
                title={
                  <ReactionBar
                    postId={post.id}
                    selectedReaction={reactions[post.id]}
                    onReactionSelect={() => {}}
                    reactionCounts={reactionCounts}
                    size="small"
                  />
                }
                arrow
                placement="top"
              >
                <Badge
                  badgeContent={Object.values(Reaction).reduce(
                    (count, reaction) =>
                      count + (reactions[post.id] === reaction ? 1 : 0),
                    0
                  )}
                  color="primary"
                >
                  <ThumbUpIcon color="action" />
                </Badge>
              </Tooltip>
              <IconButton
                size="small"
                sx={{ marginLeft: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{ marginLeft: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenConfirmDialog();
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
      <CustomModal
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
        postId={post.id}
      />
      <ConfirmDeletion
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default PostCard;
