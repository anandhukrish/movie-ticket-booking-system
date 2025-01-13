import { useAppSelector } from "../../store/hooks/redux.hooks";
import { cn } from "../../utils/helper.utils";
import {
  bookingsSelector,
  currentMovieIdSelector,
  movieSelector,
} from "../../store/booking/booking.selector";
import { TIER_COLOUR_CLASS } from "../../constants/constatnts";
import Seat from "./seat.component";

const SeatGrid = () => {
  const currentMovieId = useAppSelector(currentMovieIdSelector);
  const movies = useAppSelector(movieSelector);
  const bookings = useAppSelector(bookingsSelector);

  if (!currentMovieId) {
    return null;
  }

  const selectedBooking = bookings[currentMovieId!];
  const selectedMovie = movies.find((movie) => movie.id === currentMovieId);

  if (!selectedMovie || !selectedBooking) {
    return null;
  }

  const selectedSeatLayout = selectedMovie.layout.seats;

  const selectedMovieTierAndPrice = Object.entries(selectedSeatLayout).map(
    ([tier, details]) => {
      return {
        tier,
        price: details.price,
        colorClassName:
          TIER_COLOUR_CLASS[tier as keyof typeof selectedSeatLayout],
      };
    },
  );

  return (
    <div className="mx-auto max-w-4xl gap-5 rounded-md border border-slate-400/50 p-5">
      <div className="flex h-44 items-center gap-5 md:h-56">
        <div className="h-full overflow-hidden rounded-xl">
          <img
            src={selectedMovie.imageUrl}
            alt={selectedMovie.name}
            className="size-full"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold md:text-2xl">
            {selectedMovie.name}
          </h1>
          <p className="text-base font-extralight md:text-lg">
            Show Time : {selectedMovie.showTime}
          </p>
        </div>
      </div>

      <div className="my-5 flex items-center justify-center gap-5">
        {selectedMovieTierAndPrice.map((tp) => (
          <div className="flex items-center gap-2" key={tp.tier}>
            <div className={cn("size-4", tp.colorClassName)}></div>
            <div className="capitalize">
              {tp.tier}(₹{tp.price})
            </div>
          </div>
        ))}
      </div>

      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${selectedMovie.layout.columns} ,minmax(0,1fr))`,
        }}
      >
        {selectedBooking.seats.map((seat) => (
          <Seat seat={seat} />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        Screen this way
        <div className="mx-auto mt-2 h-2 w-3/4 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SeatGrid;
