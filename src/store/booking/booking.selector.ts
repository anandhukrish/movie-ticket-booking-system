import { RootState } from "../index";

export const currentMovieIdSelector = (state: RootState) =>
  state.booking.currentMovieId;

export const movieSelector = (state: RootState) => state.booking.movies;

export const maxSeatsAllowdedSelector = (state: RootState) =>
  state.booking.maxSeatsAllowded;

export const bookingsSelector = (state: RootState) => state.booking.bookings;
