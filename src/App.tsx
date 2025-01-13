import { Toaster } from "react-hot-toast";
import "./App.css";
import MovieBooking from "./pages/movie/movie-booking";

function App() {
  return (
    <div className="bg-slate-300/40 px-3 md:px-0">
      <MovieBooking />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
        gutter={20}
        containerStyle={{
          bottom: 50,
          right: 30,
        }}
      />
    </div>
  );
}

export default App;
