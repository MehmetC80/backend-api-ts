import { Post } from './post.type';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  posts: Post[];
}
