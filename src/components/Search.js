import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Search = (props) => {
  const inputRef = useRef();

  const sendName = () => {
    props.onGetSearchedMovieName(inputRef.current.value);
  };
  return (
    <form className="search">
      <input type="text" placeholder="Look for a movie..." ref={inputRef} />
      <Link to="/searcedhMovies">
        <button className="button" type="submit" onClick={sendName}>
          <BsSearch style={{ fontSize: "x-large" }} />
        </button>
      </Link>
    </form>
  );
};

export default Search;
