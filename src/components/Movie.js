import React, { useContext } from "react";
import { FavMovieContext } from "../context/movie-context";
import { AiFillHeart } from "react-icons/ai";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

// renders single movie-- get data as props
const Movie = (props) => {
  const movieCtx = useContext(FavMovieContext);

  // in case movie do not have picutre link
  const poster =
    props.movie.Poster === "N/A"
      ? DEFAULT_PLACEHOLDER_IMAGE
      : props.movie.Poster;

  // function to change the isFav parmeter in case of clicking the favorite button
  const updateFavoriteMovie = (movie) => {
    movie.isFav = !movie.isFav;
    movieCtx.updateFavMovie(movie);
  };

  // ckeck if the movie is includes in the favorite array- if didnt find index the result will be -1
  const isItFav = movieCtx.favorietMovies.findIndex(
    (mov) => mov.imdbID === props.movie.imdbID
  );

  const movieTitle =
    props.movie.Title.length > 20
      ? props.movie.Title.slice(0, 20) + "..."
      : props.movie.Title;

  const movieYear =
    props.movie.Type === "series" && props.movie.Year.length > 6
      ? props.movie.Year
      : props.movie.Year.length !== 4
      ? props.movie.Year.slice(0, -1)
      : props.movie.Year;

  return (
    <div className="movie" title={props.movie.Title} id={props.movie.imdbID}>
      <h3 className="movieTitle">{movieTitle}</h3>
      <div className="img-container">
        <span onClick={updateFavoriteMovie.bind(null, props.movie)}>
          {isItFav === -1 ? (
            <AiFillHeart className="fav-icon" style={{ color: "white" }} />
          ) : (
            <AiFillHeart className="fav-icon" />
          )}
        </span>
        <img
className="movie_box"
          alt={`The movie titled: ${props.movie.Title}`}
          width="200"
          height="300"
          src={poster}
        />
      </div>
      <p>{movieYear}</p>
    </div>
  );
};

export default Movie;
