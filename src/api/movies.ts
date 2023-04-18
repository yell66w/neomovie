import { API_URL } from "@/constants";
import { IMovieOverview } from "@/interfaces/Movie";

interface GetMoviesProps {
  path: string;
}
export const getMovies = async ({
  path = "/",
}: GetMoviesProps): Promise<IMovieOverview[] | []> => {
  const response = await fetch(
    `${API_URL}${path}?api_key=${process.env.API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data?.results || [];
};

export const getMovie = async ({ path }: GetMoviesProps): Promise<any> => {
  const response = await fetch(
    `${API_URL}${path}?api_key=${process.env.API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data || null;
};
