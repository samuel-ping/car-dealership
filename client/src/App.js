import React, { useState } from "react";
import Listing from "./components/Listing";
import ListingForm from "./components/ListingForm";

function App() {
  const [carListings, setCarListings] = useState([
    {
      make: "Toyota",
      model: "Sienna",
      year: 2001,
      price: 4000,
      description: "lovely car, really. Buy it now!",
      isSold: false,
    },
  ]);

  const addListing = (text) => {
    const newListings = [...carListings, { text }];
    setCarListings(newListings);
  };

  const soldListing = (index) => {
    const newListings = [...carListings];
    newListings[index].isSold = true;
    setCarListings(newListings);
  };

  return (
    <div className="App">
      <h1>Cars</h1>
      <ListingForm addListing={addListing} />
      <div className="car-list">
        <h2>Listings</h2>
        {carListings.map((listing, index) => (
          <Listing
            key={index}
            index={index}
            listing={listing}
            soldListing={soldListing}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
