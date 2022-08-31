import "./App.css";
import Movie from "./components/Movie";
import { Fragment } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

function App(props) {
  // event delegation- adding parent movies the event click to show popup
  const dataOnClickedMovie = (e) => {
    //if favorite button clicked, return and dont show popup
    if (e.target.id === "button") return;

    //getting the movie name from the clicked movie
    const clickedMovieID = e.target.closest(".movie").id;

    // calling functioon that will show the popup
    props.onShowMovieData(clickedMovieID);
  };

  return (
    <Fragment>
      {props.isLoading && !props.errorMessage && <LoadingSpinner />}
      {props.isLoading && props.errorMessage && (
        <p className="errorMessage">{`${props.errorMessage}`}</p>
      )}
      {!props.isLoading && !props.errorMessage && (
        <div className="movies" onClick={dataOnClickedMovie}>
          {props.openPageMovies.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default App;
