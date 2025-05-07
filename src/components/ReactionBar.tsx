import type { FC } from "react";
import { IconButton, Stack } from "@mui/material";
import { Reaction } from "../types/types";
import { ReactionBarProps } from "../types/types";

const ReactionBar: FC<ReactionBarProps> = ({
  selectedReaction,
  onReactionSelect,
  reactionCounts,
  size = "large",
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {Object.values(Reaction).map((reaction) => (
        <IconButton
          key={reaction}
          onClick={() => onReactionSelect(reaction)}
          style={{
            borderRadius: "40%",
            backgroundColor:
              selectedReaction === reaction ? "#4ED7F1" : "#D1E9F6",
            color: selectedReaction === reaction ? "black" : "#6b6b6b",
            fontSize: size === "small" ? "0.75rem" : "1.1rem",
            padding: size === "small" ? "4px" : "8px",
          }}
        >
          {reaction} {reactionCounts[reaction]}
        </IconButton>
      ))}
    </Stack>
  );
};

export default ReactionBar;
