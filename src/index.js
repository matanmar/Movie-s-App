import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainApp from "./MainApp";
import FavMovieContextProvider from "./context/movie-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavMovieContextProvider>
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  </FavMovieContextProvider>
);
