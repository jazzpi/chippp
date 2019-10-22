import React from "react";

interface SearchToggleProps {
  className: string,
}

const SearchToggle: React.FC<SearchToggleProps> = (props) => {
  return (
    <label className={`SearchToggle ${props.className}`}>
      <input type="checkbox" />
      <span />
    </label>
  )
}

const Search: React.FC = () => {
  return (
    <div className="Search">
      <div className="Toggles">
        <SearchToggle className="SpotifyToggle" />
        <SearchToggle className="YoutubeToggle" />
      </div>
      <div className="SearchBar">
        <input type="text" />
      </div>
    </div>
  )
}

export default Search;
