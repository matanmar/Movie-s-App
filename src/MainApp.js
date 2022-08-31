import React, { Fragment, useState, useEffect } from "react";
import App from "./App";
import { Routes, Route } from "react-router";
import Favorite from "./components/Favorite";
import Header from "./components/Header";
import Search from "./components/Search";
import Modal from "./UI/Modal";
import QueryMovies from "./components/queryMovies";
// import LoadingSpinner from "./UI/LoadingSpinner";

let content;
let temp;
// used routes to present the favorite with change in URL

const MainApp = () => {
  const [openPageMovies, setOpenPageMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // relevant to the overlay
  const [searchedMovieName, setSearchedMovieName] = useState(null);

  // URL to render the top 10 of the first loading page
  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&y=2022&apikey=4a3b711b";

  // function that fetch opening page movies
  const fetchMovieHandler = async () => {
    try {
      setIsLoading(true); // for loading spinner
      const response = await fetch(MOVIE_API_URL);
      const data1 = await response.json();
      if (data1.Error) throw new Error(data1.Error);

      const response2 = await fetch(
        `https://www.omdbapi.com/?s=man&y=2022&page=2&apikey=4a3b711b`
      );
      const data2 = await response2.json();
      if (data2.Error) throw new Error(data2.Error);

      const data = data1.Search.concat(data2.Search);

      setIsLoading(false);

      // adding all movies paramter for "is favoriet"- all sets to false at the begining
      const withFav = data.map((mov) => ({ ...mov, isFav: false }));

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
  const showMovieData = async (movieID) => {
    try {
      setErrorMessage(null);
      // fetching full data from selected movie
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieID}&apikey=4a3b711b`
      );
      const data = await response.json();

      if (data.Error) throw new Error(data.Error);

      content = (
        <Modal onClose={closeModal}>
          <button className="button-popup button" onClick={closeModal}>
            X
          </button>
          <div className="popup-contanier">
            <div className="popup-movie">
              <img
                style={{ margin: "5px" }}
                alt={`The movie titled: ${data.Title}`}
                width="400"
                height="600"
                src={
                  data.Poster && data.Poster !== "N/A"
                    ? data.Poster
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadQKvdPewPwc1Ythzivu45VMN29A_iaKRlg&usqp=CAU"
                }
              />
            </div>
            <div className="popup-movie-data">
              {data.Plot && data.Plot !== "N/A" && (
                <>
                  <p> {data.Plot}</p>
                  <br />
                </>
              )}
              {data.Runtime && data.Runtime !== "N/A" && (
                <>
                  <div>
                    <b>Duration:</b> {data.Runtime}
                  </div>
                  <br />
                </>
              )}
              {data.Actors && (
                <>
                  <div>
                    <b>Actors:</b> {data.Actors}
                  </div>
                  <br />
                </>
              )}
              {data.Genre && (
                <>
                  <div>
                    <b>Genre:</b> {data.Genre}
                  </div>
                  <br />
                </>
              )}
              {data.Ratings[0] && (
                <div>
                  <b>IMDB:</b>
                  {`${data.Ratings[0].Value} (${data.imdbVotes})`}
                </div>
              )}
            </div>
          </div>
        </Modal>
      );
      setShowOverlay(true);
    } catch (error) {
      setErrorMessage(error);
      setShowOverlay(true);
      console.log(`${error}💥💥`);

      temp = (
        <Modal onClose={closeModal}>
          <button className="button-popup button" onClick={closeModal}>
            X
          </button>
          <p className="popup-error">{error.message}</p>
        </Modal>
      );
    }
  };

  const getSearchedMovieName = (movieName) => {
    setSearchedMovieName(movieName);
  };

  return (
    <Fragment>
      {showOverlay && !errorMessage && content}
      {showOverlay && errorMessage && temp}
      <Header />
      <Search onGetSearchedMovieName={getSearchedMovieName} />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <div>
                {!errorMessage && (
                  <p className="App-intro">Sharing a few of the new movies</p>
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
