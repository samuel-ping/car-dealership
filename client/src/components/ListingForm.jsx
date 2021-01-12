import React, { useState } from "react";

const ListingForm = ({ addListing }) => {
  const [listing, setListing] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listing) return;
    addListing(listing);
    setListing("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        listing={listing}
        onChange={(e) => setListing(e.target.listing)}
      />
    </form>
  );
};

export default ListingForm;
