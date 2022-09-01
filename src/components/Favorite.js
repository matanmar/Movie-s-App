import React, { Fragment, useContext } from "react";
import Movie from "./Movie";
import { FavMovieContext } from "../context/movie-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const Favorite = (props) => {
  // using the useContext to get the favorite movies data and the "isLoading" parameter
  const movieCtx = useContext(FavMovieContext);

  // event delegation- adding parent movies the event click to show popup
  const dataOnClickedMovie = (e) => {
    //if favorite icon clicked, return and dont show popup
    if (e.target.localName === "path") return;

    //getting the movie name from the clicked movie
    const clickedMovieID = e.target.closest(".movie").id;

    // calling functioon that will show the popup
    props.onShowMovieData(clickedMovieID);
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
