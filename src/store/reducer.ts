import { combineReducers } from "@reduxjs/toolkit";
import bookingReducer from "./booking/booking.slice";

export const rootReducer = combineReducers({
  booking: bookingReducer,
});
