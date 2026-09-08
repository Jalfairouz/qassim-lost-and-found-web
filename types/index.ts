export type PostType = "Lost" | "Found";

export interface College {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  type: PostType;
  contactNumber: string;
  createdAt: string;
  collegeName: string;
  userId: string;
}

export interface CreatePostInput {
  title: string;
  description: string;
  type: PostType;
  collegeId: number;
  contactNumber: string;
}

export interface UpdatePostInput extends CreatePostInput {}

export interface PostFilters {
  type?: PostType;
  collegeId?: number;
  search?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiErrorResponse {
  message: string;
}