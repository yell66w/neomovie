export interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  id: string;
  created_at: string;
  updated_at: string;
  url: string;
}
