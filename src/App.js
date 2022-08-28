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
    const clickedMovieName = e.target.closest(".movie").title;

    // calling functioon that will show the popup
    props.onShowMovieData(clickedMovieName);
  };

  return (
    <Fragment>
      {props.isLoading && !props.errorMessage && <LoadingSpinner />}
      {props.isLoading && props.errorMessage && (
        <p className="errorMessage">{`Something went wrong: ${props.errorMessage}`}</p>
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
