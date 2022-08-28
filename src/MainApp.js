import React, { Fragment, useState, useEffect } from "react";
import App from "./App";
import { Routes, Route } from "react-router";
import Favorite from "./components/Favorite";
import Header from "./components/Header";
import Search from "./components/Search";
import Modal from "./UI/Modal";
import QueryMovies from "./components/queryMovies";

let content;
// used routes to present the favorite with change in URL

const MainApp = () => {
  const [openPageMovies, setOpenPageMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // relevant to the overlay
  const [searchedMovieName, setSearchedMovieName] = useState(null);

  // URL to render the top 10 of the first loading page
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

  // function that fetch opening page movies
  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await fetch(MOVIE_API_URL);
      const data = await response.json();

      setIsLoading(false);

      // adding all movies paramter for "is favoriet"- all sets to false at the begining
      const withFav = data.Search.map((mov) => ({ ...mov, isFav: false }));

      setOpenPageMovies(withFav);
    } catch (error) {
      setErrorMessage(error.message);
      console.error(`${error.message}💥💥`);
    }
  };

  // run opening movies for the 1st time with useEffect
  useEffect(() => {
    fetchMovieHandler();
  }, []);

  // close pop up
  const closeModal = () => {
    setShowOverlay(false);
  };

  // function that showing popup when movie area clicked
  const showMovieData = async (movieName) => {
    // fetching full data from selected movie
    const response = await fetch(
      `https://www.omdbapi.com/?t=${movieName}&apikey=4a3b711b`
    );
    const data = await response.json();

    content = (
      <Modal onClose={closeModal}>
        <div className="popup-movie">
          <img
            style={{ margin: "5px" }}
            alt={`The movie titled: ${data.Title}`}
            width="200"
            height="300"
            src={data.Poster}
          />
          <div className="popup-movie-data">
            <p> {data.Plot}</p>
            <br />
            <div>
              <b>Duration:</b> {data.Runtime}
            </div>
            <br />
            <div>
              <b>Actors:</b> {data.Actors}
            </div>
            <br />
            <div>
              <b>Genre:</b> {data.Genre}
            </div>
            <br />
            <div>
              <b>IMDB:</b>
              {` ${data.Ratings[0].Value} (${data.imdbVotes})`}
            </div>
          </div>
        </div>
        <button className="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    );
    setShowOverlay(true);
  };

  const getSearchedMovieName = (movieName) => {
    setSearchedMovieName(movieName);
  };

  return (
    <Fragment>
      {showOverlay && content}
      <Header />
      <Search onGetSearchedMovieName={getSearchedMovieName} />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <div>
                {!errorMessage && (
                  <p className="App-intro">
                    Sharing a few of our favourite movies
                  </p>
                )}
              </div>
              <App
                openPageMovies={openPageMovies}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onShowMovieData={showMovieData}
              />
            </Fragment>
          }
        />
        <Route
          path="/searcedhMovies"
          element={
            <QueryMovies
              movieName={searchedMovieName}
              onShowMovieData={showMovieData}
              firstPageNumber={1}
            />
          }
        />
        <Route
          path="/favoriet"
          element={<Favorite onShowMovieData={showMovieData} />}
        />
      </Routes>
    </Fragment>
  );
};

export default MainApp;
