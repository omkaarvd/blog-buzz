export type BlogState = {
  _id: string;
  createdBy: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[];
  comments: CommentState[];
};

export type CommentState = {
  _id: string;
  commentedBy: string;
  comment: string;
};

export type AuthState = {
  isAuthorized: boolean;
  _id: string;
  name: string;
  email: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  blogsRef: string[];
};

export type AuthResponse = {
  user: User;
  token: string;
};
