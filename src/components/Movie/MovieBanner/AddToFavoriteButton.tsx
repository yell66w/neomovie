import { toggleFavorite } from "@/api/favorites";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemStatus !== undefined) {
      setMarkedFavorite(itemStatus);
    }
  }, [id, itemStatus]);

  const toggleFavoriteHandler = async () => {
    setLoading(true);
    if (!tmdbRequestToken) {
      //Login User if no request token
      router.replace(`${APP_URL}/api/callback/auth`);
    } else {
      //mark favorite if authenticated
      await toggleFavorite({ movie_id: movieId, favorite: !markedFavorite });
      setMarkedFavorite((prev) => !prev);
    }
    setLoading(false);
  };
  return (
    <>
      {itemStatus !== undefined && (
        <Button
          onClick={toggleFavoriteHandler}
          startIcon={loading ? <Spinner /> : <BsHeartFill size={12} />}
        >
          {loading
            ? "Loading"
            : markedFavorite
            ? "Added To Favorites"
            : "Add To Favorites"}
        </Button>
      )}
    </>
  );
};

export default AddToFavoriteButton;
