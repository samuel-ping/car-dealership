import React, { useState } from "react";

const ListingForm = ({ addListing }) => {
  const [listing, setListing] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!listing) return;
    addListing(listing);
    // console.log(listing);
    // setListing({
    //   ...listing,
    //   make: "",
    //   model: "",
    //   year: "",
    //   price: "",
    //   description: "",
    // });
    // console.log(listing);
  };

  return (
    <form onSubmit={handleSubmit}>
      Make:{" "}
      <input
        type="text"
        id="make"
        name="make"
        className="input"
        listing={listing}
        onChange={(e) => setListing({ ...listing, make: e.target.value })}
      />
      <br />
      Model:{" "}
      <input
        type="text"
        id="model"
        name="model"
        className="input"
        listing={listing}
        onChange={(e) => setListing({ ...listing, model: e.target.value })}
      />
      <br />
      Year:{" "}
      <input
        type="text"
        id="year"
        name="year"
        className="input"
        listing={listing}
        onChange={(e) => setListing({ ...listing, year: e.target.value })}
      />
      <br />
      Price:{" "}
      <input
        type="number"
        id="price"
        name="price"
        className="input"
        listing={listing}
        onChange={(e) => setListing({ ...listing, price: e.target.value })}
      />
      <br />
      Description:{" "}
      <input
        type="text"
        id="description"
        name="description"
        className="input"
        listing={listing}
        onChange={(e) =>
          setListing({ ...listing, description: e.target.value })
        }
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ListingForm;
