import { useAppDispatch, useAppSelector } from "../store/hooks/redux.hooks";
import toast from "react-hot-toast";
import { bookSelectedSeats } from "../store/booking/booking.slice";
import { cn } from "../utils/helper.utils";
import {
  bookingsSelector,
  currentMovieIdSelector,
  movieSelector,
} from "../store/booking/booking.selector";

const BookingSummary = () => {
  const dispatch = useAppDispatch();

  const currentMovieId = useAppSelector(currentMovieIdSelector);
  const bookings = useAppSelector(bookingsSelector);
  const movies = useAppSelector(movieSelector);

  if (!currentMovieId) {
    return null;
  }

  const selectedBooking = bookings[currentMovieId!];
  const selectedMovie = movies.find((movie) => movie.id === currentMovieId);

  if (!selectedMovie || !selectedBooking) {
    return null;
  }

  const selectedSeatDetails = selectedBooking.selectedSeats
    .map((seatId) => selectedBooking.seats.find((seat) => seat.id === seatId)!)
    .filter(Boolean);

  const totalAmount = selectedSeatDetails.reduce(
    (sum, seat) => sum + seat.price,
    0,
  );
  const handleBooking = () => {
    if (selectedSeatDetails.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    dispatch(bookSelectedSeats());
    toast.success("Booking successful! Enjoy the show!");
  };
  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>

      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Selected Seats:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSeatDetails.map((seat) => (
            <div
              key={seat.id}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              {seat.id} - ₹{seat.price}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-lg font-bold">Total Amount: ₹{totalAmount}</div>
        <button
          onClick={handleBooking}
          className={cn(
            "rounded-lg px-6 py-2 font-semibold text-white transition-colors",
            selectedSeatDetails.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400",
          )}
          disabled={selectedSeatDetails.length === 0}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
