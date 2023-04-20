import { createSession, getRequestToken } from "@/api/authentication";
import { createList, findListByName } from "@/api/favorites";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { APP_URL, LIST_NAME, MAX_COOKIE_AGE } from "./../../../constants/index";
//Todo refactor
export default async function authCallbackHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query, method } = req;
  const request_token = query.request_token;
  const approved = query.approved;

  switch (method) {
    case "GET":
      if (request_token && approved) {
        //Create session
        const session_id = await createSession({ request_token });

        const list = await findListByName({ name: LIST_NAME, session_id });

        //Automatically create a list
        //Only create the list if it does not exist yet
        if (!list) {
          await createList({ name: LIST_NAME, session_id });
        }

        const options = {
          req,
          res,
          maxAge: MAX_COOKIE_AGE,
          path: "/",
        };
        setCookie("tmdb-request-token", request_token, options);
        setCookie("tmdb-session", session_id, options);
      } else {
        //Get authentication if request token is not approved/valid
        const request_token = await getRequestToken();
        return res.redirect(
          307,
          `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${APP_URL}/api/callback/auth`
        );
      }
      return res.redirect(307, "/");
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
