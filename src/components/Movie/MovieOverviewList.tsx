import { Movie } from "@/interfaces/Movie";
import ScrollContainer from "react-indiana-drag-scroll";

type Props = { title: string; movies: Movie[] };

const MovieOverviewList = ({ title = "Movies", movies }: Props) => {
  return (
    <section className="mr-4 lg:mr-16 flex flex-col gap-6">
      <h1 className="ml-4 lg:ml-16 text-lg lg:text-2xl font-bold">{title}</h1>
      <ScrollContainer className="w-full h-30 md:h-60 flex gap-5 overflow-x-clip">
        {[
          ...[1, 2, 3, 4, 5].map((id) => {
            return (
              <div
                key={id}
                className="flex flex-col gap-3 first:ml-4 lg:first:ml-16"
              >
                <div
                  style={{
                    backgroundImage: `url(https://images.alphacoders.com/125/1254595.jpg)`,
                  }}
                  className="w-[200px] min-w-[200px] md:w-[360px] md:min-w-[360px] lg:w-[400px] lg:min-w-[400px] h-28 md:h-full bg-center bg-cover duration-500 rounded-xl"
                />
                <p className="text-xs lg:text-sm">Peaky Blinders</p>
              </div>
            );
          }),
        ]}
      </ScrollContainer>
    </section>
  );
};

export default MovieOverviewList;
