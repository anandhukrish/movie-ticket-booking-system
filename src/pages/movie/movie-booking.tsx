import { useEffect } from "react";
import { setMovies } from "../../store/booking/booking.slice";
import { movieInfo } from "../../data/movies";
import { LuClapperboard } from "react-icons/lu";
import MovieTabs from "../../components/movie-tabs";
import SeatGrid from "../../components/seat/seat-grid";
import { useAppDispatch } from "../../store/hooks/redux.hooks";
import BookingSummary from "../../components/booking-summary";

const MovieBooking = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMovies(movieInfo));
  });
  return (
    <div className="container mx-auto min-h-screen py-5">
      <div>
        <div className="flex items-center justify-center gap-2">
          <LuClapperboard className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold">Movie Seat Booking</h1>
        </div>
        <MovieTabs />
        <SeatGrid />
        <BookingSummary />
      </div>
    </div>
  );
};

export default MovieBooking;
