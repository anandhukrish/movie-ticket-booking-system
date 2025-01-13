import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks/redux.hooks";
import { cn } from "../utils/helper.utils";
import { setCurrentMovie } from "../store/booking/booking.slice";
import {
  currentMovieIdSelector,
  movieSelector,
} from "../store/booking/booking.selector";

const MovieTabs = () => {
  const dispatch = useDispatch();

  const currentMovieId = useAppSelector(currentMovieIdSelector);
  const movies = useAppSelector(movieSelector);

  return (
    <div className="mx-auto my-6 flex max-w-4xl gap-5 md:my-10">
      {movies.map((movie) => (
        <div
          className={cn(
            "cursor-pointer rounded-lg border border-gray-500 bg-white/60 px-3 py-2 sm:px-5 sm:py-3",
            movie.id === currentMovieId &&
              "border-blue-600 bg-blue-600 text-white transition-colors",
          )}
          key={movie.id}
          onClick={() => dispatch(setCurrentMovie(movie.id))}
        >
          <h1 className="text-sm font-bold sm:text-base">
            {movie.name} - {movie.showTime}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default MovieTabs;
