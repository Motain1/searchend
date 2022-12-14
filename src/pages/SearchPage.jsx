import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import response from "../response";
import SearchIcon from "@mui/icons-material/Search";
import { useStateValue } from "../StateProvider";
import UseGoogleSearch from "../useGoogleSearch";
import "./SearchPage.css";
import {
  Description,
  Image,
  LocalOffer,
  MoreVert,
  Room,
} from "@mui/icons-material";

const SearchPage = () => {
  const [{ term }, dispatch] = useStateValue();
   const {data} = UseGoogleSearch(term); // LIVE CALL API YOYOYO

  // const data = response; // LOCAL CALL API - TESLA

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <Description />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <Image />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOffer />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <Room />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVert />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultsCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((items) => (
            <div className="searchPage__results">
              <a href={items.link}>
                {items.pagemap?.cse_image?.length > 0 &&
                  items.pagemap?.cse_image[0]?.src && (
                    <img
                      src={items.pagemap?.cse_image[0]?.src}
                      alt=""
                      className="searchPage__resultImage"
                    />
                  )}
                {items.displayLink} ???
              </a>
              <a href={items.link} className="searchPage__resultTitle">
                <h2>{items.title}</h2>
              </a>
              <p className="searchPage__resultsSnippet">{items.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
