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
    SMILE = '🙂',
    HEART = '❤️',
    LAUGH = '😂',
    ANGRY = '😡',
    THUMBS_UP = '👍🏻',
    FIRE = '🔥'
  }