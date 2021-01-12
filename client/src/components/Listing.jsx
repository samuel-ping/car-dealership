import React from "react";

const Listing = (props) => {
  return (
    <div className="listing">
      <span>{props.make}</span>
      <span>{props.model}</span>
    </div>
  );
};

export default Listing;
