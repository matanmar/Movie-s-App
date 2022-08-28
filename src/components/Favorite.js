import React, { Fragment, useContext } from "react";
import Movie from "./Movie";
import { FavMovieContext } from "../context/movie-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const Favorite = (props) => {
  // using the useContext to get the favorite movies data and the "isLoading" parameter
  const movieCtx = useContext(FavMovieContext);

  // event delegation- adding parent movies the event click to show popup
  const dataOnClickedMovie = (e) => {
    //if favorite button clicked, return and dont show popup
    if (e.target.id === "button") return;

    //getting the movie name from the clicked movie
    const clickedMovieName = e.target.closest(".movie").title;

    // calling functioon that will show the popup
    props.onShowMovieData(clickedMovieName);
  };

  return (
    <Fragment>
      {movieCtx.isLoading && <LoadingSpinner className="favorite" />}
      {!movieCtx.isLoading && (
        <div className={["movies , favorite"]} onClick={dataOnClickedMovie}>
          {movieCtx.favorietMovies.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              onshowMovieData={props.onShowMovieData}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Favorite;
