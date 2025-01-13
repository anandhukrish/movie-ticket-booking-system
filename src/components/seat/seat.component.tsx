import { Seat as SeatType } from "../../types/seat.types";
import { TIER_COLOUR_CLASS_WITH_HOVER } from "../../constants/constatnts";
import { ClassValue } from "clsx";
import { cn } from "../../utils/helper.utils";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux.hooks";
import {
  bookingsSelector,
  currentMovieIdSelector,
  maxSeatsAllowdedSelector,
} from "../../store/booking/booking.selector";
import { toggleSeat } from "../../store/booking/booking.slice";

const Seat = ({ seat }: { seat: SeatType }) => {
  const dispatch = useAppDispatch();

  const maxSeatsAllowded = useAppSelector(maxSeatsAllowdedSelector);
  const currentMovieId = useAppSelector(currentMovieIdSelector);
  const bookings = useAppSelector(bookingsSelector);

  const selectedBooking = bookings[currentMovieId!];

  /**
   * The function `getSeatColor` determines the background color class for a seat based on its booking
   * status and tier.
   * @param {SeatType} seat - Seat object with properties isBooked (boolean), isSelected (boolean), and tier
   * (string)
   * @returns The function `getSeatColor` returns a CSS class value based on the properties of the
   * `seat` object. If the seat is booked, it returns "bg-gray-400". If the seat is selected, it returns
   * "bg-green-500". Otherwise, it returns a CSS class value based on the `tier` property of the `seat`
   * object using the `TIER_COLOUR_CLASS
   */
  const getSeatColor = (seat: SeatType): ClassValue => {
    if (seat.isBooked) return "bg-gray-400";
    if (seat.isSelected) return "bg-green-500";

    switch (seat.tier) {
      case "Silver":
        return TIER_COLOUR_CLASS_WITH_HOVER.silver;
      case "Gold":
        return TIER_COLOUR_CLASS_WITH_HOVER.gold;
      case "Platinum":
        return TIER_COLOUR_CLASS_WITH_HOVER.platinum;
    }
  };

  const handleSeatBooking = (seatId: string) => {
    const seat = selectedBooking.seats.find((seat) => seat.id === seatId);
    if (!seat) {
      return;
    }
    //checking seat already booked
    if (seat.isBooked) {
      toast.error("seat already booked");
      return;
    }
    // check selected seat exceed the maximum limit
    if (
      !seat.isSelected &&
      selectedBooking.selectedSeats.length === maxSeatsAllowded
    ) {
      toast.error(`You can only select up to ${maxSeatsAllowded} seats`);
      return;
    }

    dispatch(toggleSeat(seatId));
  };
  return (
    <button
      className={cn(
        "font-md flex aspect-square w-full items-center justify-center rounded-md border text-xs transition-colors md:text-sm",
        getSeatColor(seat),
        seat.isBooked && "cursor-not-allowed",
      )}
      disabled={seat.isBooked}
      onClick={() => handleSeatBooking(seat.id)}
    >
      {seat.id}
    </button>
  );
};

export default Seat;
