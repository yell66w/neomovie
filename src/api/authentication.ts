import { API_URL } from "@/constants";

export const createSession = async ({ request_token }: any) => {
  try {
    const response = await fetch(
      `${API_URL}/authentication/session/new?api_key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed at creating session");
    }

    const { session_id } = await response.json();

    return session_id;
  } catch (error) {
    console.log(error);
  }
};

export const getRequestToken = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${API_URL}/authentication/token/new?api_key=${process.env.API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.request_token;
  } catch (error) {
    console.log(error);
  }
  return null;
};
