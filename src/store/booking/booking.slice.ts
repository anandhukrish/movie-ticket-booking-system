import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movies.types";
import { Seat, Tier } from "../../types/seat.types";

type MovieBookingState = {
  seats: Seat[];
  selectedSeats: string[];
};

type InitialState = {
  movies: Movie[];
  currentMovieId: string | null;
  bookings: Record<string, MovieBookingState>;
  maxSeatsAllowded: number;
};

function getTierAndPrice(
  row: number,
  movie: Movie,
): { tier: Tier; price: number } {
  const { seats } = movie.layout;
  if (row < seats.gold.row) {
    return { tier: "Gold", price: seats.gold.price };
  } else if (row < seats.gold.row + seats.silver.row) {
    return { tier: "Silver", price: seats.silver.price };
  } else {
    return { tier: "Platinum", price: seats.platinum.price };
  }
}

function generateSeats(movie: Movie): Seat[] {
  const seats: Seat[] = [];
  const { columns, rows } = movie.layout;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const rowLabel = String.fromCharCode(65 + row);
      const { tier, price } = getTierAndPrice(row, movie);

      seats.push({
        id: `${rowLabel}${col + 1}`,
        isBooked: false,
        isSelected: false,
        price: price,
        tier: tier as Tier,
        column: col,
        row: row,
      });
    }
  }
  return seats;
}

const initialState: InitialState = {
  movies: [],
  currentMovieId: null,
  bookings: {},
  maxSeatsAllowded: 8,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;

      //initialize booking state for each movie
      action.payload.forEach((movie) => {
        if (!state.bookings[movie.id]) {
          state.bookings[movie.id] = {
            seats: generateSeats(movie),
            selectedSeats: [],
          };
        }
      });

      //initialize the first movie
      if (!state.currentMovieId) {
        state.currentMovieId = action.payload[0].id;
      }
    },

    setCurrentMovie(state, action: PayloadAction<string>) {
      state.currentMovieId = action.payload;
    },

    toggleSeat(state, action: PayloadAction<string>) {
      if (!state.currentMovieId) {
        return;
      }
      const booking = state.bookings[state.currentMovieId];

      const selectedSeat = booking.seats.find(
        (seat) => seat.id === action.payload,
      );
      if (!selectedSeat) {
        return;
      }

      if (selectedSeat.isSelected) {
        selectedSeat.isSelected = false;
        booking.selectedSeats.filter((seatId) => seatId !== action.payload);
      } else if (booking.selectedSeats.length < state.maxSeatsAllowded) {
        selectedSeat.isSelected = true;
        booking.selectedSeats.push(action.payload);
      }
    },

    bookSelectedSeats(state) {
      if (!state.currentMovieId) return;

      const movieBooking = state.bookings[state.currentMovieId];
      movieBooking.seats.forEach((seat) => {
        if (seat.isSelected) {
          seat.isBooked = true;
          seat.isSelected = false;
        }
      });
      movieBooking.selectedSeats = [];
    },
  },
});

export default bookingSlice.reducer;
export const { setMovies, setCurrentMovie, toggleSeat, bookSelectedSeats } =
  bookingSlice.actions;
