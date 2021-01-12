import React from "react";

const Listing = ({ key, index, listing, soldListing }) => {
  return (
    <div style={{ display: "flex", flexDirection: "horizontal" }}>
      <div
        className="listing-details"
        style={{ textDecoration: listing.isSold ? "line-through" : "" }}
      >
        <span>{listing.make}</span> <span>{listing.model}</span>{" "}
        <span>{listing.year}</span>
        <br />
        <span>${listing.price}</span>
        <br />
        <span>{listing.description}</span>
      </div>
      {listing.isSold ? (
        ""
      ) : (
        <button onClick={() => soldListing(index)}>Sold</button>
      )}
    </div>
  );
};

export default Listing;
