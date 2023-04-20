import toggleFavorite from "@/services/favorites/toggleFavorite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function favoritesHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        return await toggleFavorite(req, res);
      } catch (error: any) {
        return res.status(400).send({ error: true, message: error.message });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
