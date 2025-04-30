import React from 'react';
import { IconButton, Stack } from '@mui/material';
import { Reaction } from '../utils/localStorage';

interface ReactionBarProps {
  postId: number;
  selectedReaction: Reaction | null;
  onReactionSelect: (reaction: Reaction) => void;
  reactionCounts: { [key in Reaction]: number };
}

const ReactionBar: React.FC<ReactionBarProps> = ({
  selectedReaction,
  onReactionSelect,
  reactionCounts
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {Object.values(Reaction).map((reaction) => (
        <IconButton
          key={reaction}
          onClick={() => onReactionSelect(reaction)}
          style={{
            borderRadius: '50%',
            backgroundColor: selectedReaction === reaction ? '#e0f7fa' : 'transparent',
            border: selectedReaction === reaction ? '2px solid #00796b' : 'none',
            color: selectedReaction === reaction ? '#00796b' : 'black'
          }}
        >
          {reaction} {reactionCounts[reaction]}
        </IconButton>
      ))}
    </Stack>
  );
};

export default ReactionBar;
