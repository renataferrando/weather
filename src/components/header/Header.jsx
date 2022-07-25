import React from "react";
import "./_header.scss";
import SearchInput from "../searchInput/SearchInput";
import useWindowSize from "../../hooks/useWindowSize";
const Header = () => {
  const [height, width] = useWindowSize();
  const isMobile = width < 768;
  return (
    <header className="header">
      {!isMobile ? (
        <h1>
          The Weather <span>App</span>
        </h1>
      ) : (
        <h1>TWA</h1>
      )}
      <SearchInput />
    </header>
  );
};

export default Header;
