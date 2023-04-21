export interface IMovie {
  poster_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  genres: { id: number; name: string }[];
  release_date: string;
  tagline: string | null;
  adult: boolean;
  budget: number;
  homepage: string | null;
  original_language: string;
  overview: string;
  popularity: number;
  revenue: number;
  runtime: number;
  status: string;
}

export interface IMovieOverview {
  poster_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  adult: boolean;
}
