import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./reducer";

const presistConfig = {
  key: "root",
  storage,
};

const presistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
