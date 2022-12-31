import React, { useState, useEffect } from "react";

export const FavMovieContext = React.createContext();

// function to fetch movie to API with 'PUT' method
const fetchMovie = (data) => {
  fetch("https://movie-january-default-rtdb.firebaseio.com/favoriets.json", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

const FavMovieContextProvider = (props) => {
  const [favorietMovies, setFavorietMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFav = async () => {
      // fetching the favorite movies from database(firebase)
      const response = await fetch(
        "https://movie-january-default-rtdb.firebaseio.com/favoriets.json"
      );

      const data = await response.json();
      if (data !== null) {
        setFavorietMovies(data);
      }
    };
    fetchFav();
  }, []);

  // updateing the favorites movies array
  const updateFavMovie = (movie) => {
    // if array is empty
    if (favorietMovies.length === 0) {
      const temp = [movie];
      setIsLoading(true);
      fetchMovie(temp);
      setIsLoading(false);
      setFavorietMovies([movie]);
      return;

      // this else checks if movie need to be added or deleted
    } else {
      // if movie is already in the array
      const isExist = [...favorietMovies].filter(
        (mov) => mov.imdbID === movie.imdbID
      );

      // if exsit need to delete him
      if (isExist.length !== 0) {
        const deleteFromFavorite = favorietMovies.filter(
          (mov) => mov.imdbID !== movie.imdbID
        );
        setIsLoading(true);
        fetchMovie(deleteFromFavorite);
        setIsLoading(false);
        setFavorietMovies(deleteFromFavorite);

        // if NOT exist need to add him
      } else {
        const temp = [...favorietMovies, movie];
        setIsLoading(true);
        fetchMovie(temp);
        setIsLoading(false);
        setFavorietMovies((preArr) => [...preArr, movie]);
      }
    }
  };

  return (
    <FavMovieContext.Provider
      value={{
        favorietMovies,
        updateFavMovie,
        isLoading,
      }}
    >
      {props.children}
    </FavMovieContext.Provider>
  );
};

export default FavMovieContextProvider;
