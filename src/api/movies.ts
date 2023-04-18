import { API_URL } from "@/constants";
import { IMovieOverview } from "@/interfaces/Movie";

interface GetMoviesProps {
  path: string;
}
interface SearchMoviesProps {
  query: string;
  page?: number;
}
export const getMovies = async ({
  path = "/",
}: GetMoviesProps): Promise<IMovieOverview[] | []> => {
  const response = await fetch(
    `${API_URL}/movie${path}?api_key=${process.env.API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data?.results || [];
};

export const searchMovies = async ({
  query = "",
  page = 1,
}: SearchMoviesProps): Promise<{
  results: IMovieOverview[];
  page: number;
  total_pages: number;
  total_results: number;
}> => {
  const response = await fetch(
    `${API_URL}/search/movie?query=${query}&api_key=${process.env.API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data || null;
};

export const getMovie = async ({ path }: GetMoviesProps): Promise<any> => {
  const response = await fetch(
    `${API_URL}/movie${path}?api_key=${process.env.API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data || null;
};
