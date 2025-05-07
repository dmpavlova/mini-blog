export interface Post {
  id: number;
  title: string;
  content: string;
  likes?: number;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
  postId: number;
  date: string;
}

export interface ReactionCounts {
  [key: number]: Reaction | null;
}

export enum Reaction {
  SMILE = "🙂",
  HEART = "❤️",
  LAUGH = "😂",
  ANGRY = "😡",
  THUMBS_UP = "👍🏻",
  FIRE = "🔥",
}

export interface ReactionBarProps {
  postId: number;
  selectedReaction: Reaction | null;
  onReactionSelect: (reaction: Reaction) => void;
  reactionCounts: { [key in Reaction]: number };
  size?: 'small' | 'large';
}

export interface PostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}