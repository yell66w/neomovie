import { API_URL } from "@/constants";
import { Movie } from "@/interfaces/Movie";

interface GetMoviesProps {
  path: string;
}
export const getMovies = async ({
  path = "/",
}: GetMoviesProps): Promise<Movie[] | []> => {
  const response = await fetch(
    `${API_URL}${path}?api_key=${process.env.API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data?.results || [];
};
