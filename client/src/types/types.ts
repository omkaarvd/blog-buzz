export type CommentState = {
  _id: string;
  commentedBy: string;
  comment: string;
};

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

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  blogsRef?: string[];
}

export interface AuthState extends User {
  isAuthorized: boolean;
}

export interface AuthResponse extends User {
  token: string;
}
