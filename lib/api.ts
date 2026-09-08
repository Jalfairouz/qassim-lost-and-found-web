import {
  College,
  Post,
  PostFilters,
  CreatePostInput,
  UpdatePostInput,
  RegisterInput,
  LoginInput,
  LoginResponse,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

 if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const errorBody = await res.json();
      if (errorBody.message) {
        message = errorBody.message;
      } else if (errorBody.errors) {
        // ASP.NET Core ValidationProblemDetails shape: { errors: { Field: ["msg"] } }
        const firstError = Object.values(errorBody.errors)[0];
        message = Array.isArray(firstError) ? firstError[0] : message;
      }
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
// ---- Colleges ----
export function getColleges(): Promise<College[]> {
  return request<College[]>("/colleges");
}

// ---- Posts ----
export function getPosts(filters: PostFilters = {}): Promise<Post[]> {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.collegeId) params.set("collegeId", String(filters.collegeId));
  if (filters.search) params.set("search", filters.search);

  const query = params.toString();
  return request<Post[]>(`/posts${query ? `?${query}` : ""}`);
}

export function getPostById(id: number): Promise<Post> {
  return request<Post>(`/posts/${id}`);
}

export function createPost(input: CreatePostInput, token: string): Promise<Post> {
  return request<Post>("/posts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}

export function updatePost(
  id: number,
  input: UpdatePostInput,
  token: string
): Promise<void> {
  return request<void>(`/posts/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}

export function deletePost(id: number, token: string): Promise<void> {
  return request<void>(`/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getMyPosts(token: string): Promise<Post[]> {
  return request<Post[]>("/posts/my-posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ---- Auth ----
export function register(input: RegisterInput): Promise<{ message: string }> {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function login(input: LoginInput): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export { ApiError };