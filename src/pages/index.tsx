import Carousel from "@/components/Carousel";
import MovieOverviewList from "@/components/Movie/MovieOverviewList";
export default function Home() {
  return (
    <main>
      <Carousel />
      <div className="mt-16 flex flex-col gap-16">
        <MovieOverviewList title="Popular" movies={[]} />
        <MovieOverviewList title="Top Rated" movies={[]} />
        <MovieOverviewList title="Upcoming" movies={[]} />
      </div>

      {/* Now Playing */}
    </main>
  );
}
