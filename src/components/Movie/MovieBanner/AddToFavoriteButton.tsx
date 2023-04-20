import { toggleFavorite } from "@/api/favorites";
import Button from "@/components/Button";
import { APP_URL } from "@/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsHeartFill } from "react-icons/bs";

interface Props {
  itemStatus?: boolean;
  movieId: number;
}

const AddToFavoriteButton = ({ itemStatus, movieId }: Props) => {
  const [cookies] = useCookies();
  const [markedFavorite, setMarkedFavorite] = useState(itemStatus || false);
  const router = useRouter();
  const { id } = router.query;
  const tmdbRequestToken = cookies["tmdb-request-token"];

  useEffect(() => {
    if (itemStatus !== undefined) {
      setMarkedFavorite(itemStatus);
    }
  }, [id, itemStatus]);

  const toggleFavoriteHandler = async () => {
    if (!tmdbRequestToken) {
      //Login User if no request token
      router.replace(`${APP_URL}/api/callback/auth`);
    } else {
      //mark favorite if authenticated
      await toggleFavorite({ movie_id: movieId, favorite: !markedFavorite });
      setMarkedFavorite((prev) => !prev);
    }
  };
  return (
    <>
      {itemStatus !== undefined && (
        <Button
          onClick={toggleFavoriteHandler}
          startIcon={<BsHeartFill size={12} />}
        >
          {markedFavorite ? "Added To Favorites" : "Add To Favorites"}
        </Button>
      )}
    </>
  );
};

export default AddToFavoriteButton;
