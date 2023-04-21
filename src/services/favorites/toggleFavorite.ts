import {
  addToFavorites,
  findListByName,
  removeFromFavorites,
} from "@/api/favorites";
import { LIST_NAME, MAX_COOKIE_AGE } from "@/constants";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

const toggleFavorite = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { media_id, media_type, favorite } = req.body;

  if (!media_id || !media_type || favorite === undefined) {
    throw new Error("Invalid request body.");
  }
  const session_id = getCookie("tmdb-session", {
    req,
    res,
    maxAge: MAX_COOKIE_AGE,
    path: "/",
  });
  if (!session_id) {
    return res.status(401).send("Unauthorized");
  }
  const list = await findListByName({ name: LIST_NAME, session_id });

  let data;

  if (favorite) {
    data = await addToFavorites({ list_id: list.id, media_id, session_id });
  } else {
    data = await removeFromFavorites({
      list_id: list.id,
      media_id,
      session_id,
    });
  }
  if (!data) {
    throw new Error("Cannot toggle favorites.");
  }
  return res.status(201).json({
    status_code: data.status_code,
    status_message: data.status_message,
  });
};

export default toggleFavorite;
