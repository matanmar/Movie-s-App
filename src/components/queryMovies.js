import React, { Fragment, useCallback, useEffect, useState } from "react";
import App from "../App";
import Paginate from "./Paginate";

let currentPage;
let totalResults = "";

const QueryMovies = (props) => {
  const [renderMovies, setRenderMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //   will render all matches to the  input from search

  const fetchData = useCallback(
    async (pageNumber = 1) => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(
          `https://www.omdbapi.com/?s=${props.movieName}&page=${pageNumber}&apikey=4a3b711b`
        );

        const data = await response.json();

        const withFav = data.Search.map((mov) => ({ ...mov, isFav: false }));
        setIsLoading(false);

        totalResults = +data.totalResults;

        // if promise are Ok
        if (data.Response === "True") {
          setRenderMovies(withFav);
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.error(`${error.message}💥💥`);
      }
    },
    [props.movieName]
  );

  useEffect(() => {
    fetchData();
    currentPage = 1;
  }, [fetchData]);

  const changePage = (pageNumber) => {
    fetchData(pageNumber);
  };

  return (
    <Fragment>
      <App
        errorMessage={errorMessage}
        isLoading={isLoading}
        openPageMovies={renderMovies}
        onShowMovieData={props.onShowMovieData}
      />

      <Paginate
        pageNumber={currentPage}
        postsPerPage={10}
        totalPosts={totalResults || 1}
        onChangepage={changePage}
        movieName={props.movieName}
      />
    </Fragment>
  );
};

export default QueryMovies;
