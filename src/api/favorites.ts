import { API_KEY, API_URL, APP_URL, LIST_NAME } from "@/constants";
import { IMovieOverview } from "@/interfaces/Movie";

export const findListByName = async ({
  name,
  session_id,
}: {
  name: string;
  session_id: any;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/account/0/lists?api_key=${API_KEY}&session_id=${session_id}`
    );
    if (!response.ok) {
      throw new Error("Failed at fetching lists");
    }
    const { results: lists } = await response.json();
    const foundList = lists.find(
      (list: { name: string }) => list.name === name
    );
    return foundList;
  } catch (error) {
    console.log(error);
  }
};

export const createList = async ({
  name,
  session_id,
}: {
  name: string;
  session_id: string;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/list?api_key=${API_KEY}&session_id=${session_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description: "My favorites",
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed at creating list");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteMovies = async ({
  session_id,
  page = 1,
}: any): Promise<{
  items: IMovieOverview[];
  item_count: number;
}> => {
  try {
    const list = await findListByName({ name: LIST_NAME, session_id });

    const response = await fetch(
      `${API_URL}/list/${list.id}?api_key=${API_KEY}&page=${page}&session_id=${session_id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  return {
    items: [],
    item_count: 0,
  };
};

export const addToFavorites = async ({
  media_id,
  list_id,
  session_id,
}: {
  list_id: number;
  media_id: number;
  session_id: any;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/list/${list_id}/add_item?api_key=${API_KEY}&session_id=${session_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_id,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed at adding to favorites.");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavorites = async ({
  media_id,
  list_id,
  session_id,
}: {
  list_id: number;
  media_id: number;
  session_id: any;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/list/${list_id}/remove_item?api_key=${API_KEY}&session_id=${session_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_id,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed at adding to favorites.");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const checkItemStatus = async ({
  session_id,
  movie_id,
}: {
  session_id: any;
  movie_id: number;
}): Promise<boolean> => {
  try {
    const list = await findListByName({ name: LIST_NAME, session_id });
    const response = await fetch(
      `${API_URL}/list/${list.id}/item_status?api_key=${API_KEY}&movie_id=${movie_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to check item status");
    }
    const { item_present } = await response.json();
    return item_present;
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const toggleFavorite = async ({
  movie_id,
  favorite,
}: {
  movie_id: number;
  favorite: boolean;
}) => {
  const response = await fetch(`${APP_URL}/api/favorites`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media_id: movie_id,
      media_type: "movie",
      favorite,
    }),
  });
  await response.json();
};
