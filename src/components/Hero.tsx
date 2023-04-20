import { toggleFavorite } from "@/api/favorites";
import {
  APP_URL,
  IMAGEDB_URL,
  PLACEHOLDER_BACKGROUND_IMAGE,
  YOUTUBE_URL,
} from "@/constants";
import { IImage } from "@/interfaces/Image";
import { IVideo } from "@/interfaces/Video";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsArrowRight, BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import Button from "./Button";
import Genres from "./Genres";
import Modal from "./Modal";
import PosterCard from "./Poster/PosterCard";
import PosterList from "./Poster/PosterList";
import Star from "./Star";
//TODO refactor this page
interface Props {
  background_url: string | null;
  title: string;
  overview: string;
  posters?: IImage[];
  average_rating?: number;
  review_count?: number;
  genres?: { id: number; name: string }[];
  videos?: IVideo[];
  navigateTo?: any;
  movieId: number;
  itemStatus?: boolean;
}

const Hero = ({
  background_url = "",
  posters,
  average_rating,
  title,
  genres,
  overview,
  review_count,
  videos,
  navigateTo,
  itemStatus,
  movieId,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies] = useCookies();
  const [markedFavorite, setMarkedFavorite] = useState(itemStatus || false);
  const tmdbRequestToken = cookies["tmdb-request-token"];
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (itemStatus !== undefined) {
      setMarkedFavorite(itemStatus);
    }
  }, [id, itemStatus]);

  const officialTrailer = videos?.find(
    (video) => video.official && video.type === "Trailer"
  );

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
      <div>
        <div
          style={{
            backgroundImage: `url(${
              background_url
                ? `${IMAGEDB_URL}/${background_url}`
                : PLACEHOLDER_BACKGROUND_IMAGE
            })`,
          }}
          className="h-80 md:h-[500px] lg:h-[1000px]  w-full bg-center bg-cover duration-500 opacity-70"
        />
        <div className="lg:bg-gradient-to-t lg:from-black lg:via-transparent lg:to-transparent flex flex-col lg:flex-row gap-20  lg:gap-40 lg:absolute lg:top-auto lg:bottom-0 lg:pb-16 w-full px-4 lg:px-0 lg:pl-32">
          <div className="flex flex-col lg:w-6/12">
            <div className="flex flex-col gap-6 mt-10">
              <h1 className="font-bold text-2xl lg:text-6xl">{title}</h1>
              <div className="flex flex-col lg:flex-row text-sm  gap-1 lg:items-center">
                {/* Rating */}
                {!!average_rating && !!review_count && (
                  <div className="flex items-center gap-1 mr-6">
                    <Star />
                    <p className="text-base ">
                      {Number(average_rating).toFixed(1)}
                      <span className="text-xs ml-1">| {review_count}</span>
                    </p>
                  </div>
                )}
                {/* Genre */}
                {!!genres?.length && <Genres genres={genres} />}
              </div>
            </div>
            {/* Overview */}
            <div className="flex flex-col gap-3 mt-10">
              <p className="text-xs lg:text-sm">{overview}</p>
            </div>
            {/* Actions */}
            <div className="w-96 mt-20 flex gap-5">
              {itemStatus !== undefined && (
                <Button
                  onClick={toggleFavoriteHandler}
                  startIcon={<BsHeartFill size={12} />}
                >
                  {markedFavorite ? "Added To Favorites" : "Add To Favorites"}
                </Button>
              )}

              {!!officialTrailer && (
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(true)}
                  startIcon={<BsFillPlayFill size={16} />}
                >
                  Watch Trailer
                </Button>
              )}
              {navigateTo && (
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/${navigateTo}`)}
                  endIcon={<BsArrowRight size={16} />}
                >
                  View Movie Details
                </Button>
              )}
            </div>
          </div>
          {/* Posters */}
          {!!posters?.length && (
            <div className="flex flex-col lg:w-6/12 gap-10">
              <PosterList title="POSTERS">
                {posters?.map(({ file_path }) => {
                  return <PosterCard image_url={file_path} key={file_path} />;
                })}
              </PosterList>
            </div>
          )}
        </div>
      </div>
      {showModal && officialTrailer ? (
        <Modal open={showModal && !!officialTrailer} setOpen={setShowModal}>
          <iframe
            width="100%"
            height="100%"
            src={`${YOUTUBE_URL}/${officialTrailer?.key}?autoplay=true`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal>
      ) : null}
    </>
  );
};

export default Hero;
