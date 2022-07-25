import React from "react";

const SuggestBox = ({ onClick, children, className, ...r }) => {
  return (
    <div
      data-testid="suggest-box"
      onClick={onClick}
      className={className}
      {...r}
    >
      {children}
    </div>
  );
};

export default SuggestBox;
