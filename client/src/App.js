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
      description: "lovely car, really. Buy it now! please!",
      isSold: false,
    },
  ]);

  const addListing = (newListing) => {
    const newListings = [...carListings, newListing];
    setCarListings(newListings);
  };

  const markSold = (index) => {
    const newListings = [...carListings];
    newListings[index].isSold = true;
    setCarListings(newListings);
  };

  const markUnsold = (index) => {
    const newListings = [...carListings];
    newListings[index].isSold = false;
    setCarListings(newListings);
  };

  return (
    <div className="App">
      <h1>Cars</h1>
      <h2>Add Listing</h2>
      <ListingForm addListing={addListing} />
      <div className="car-list">
        <h2>Listings</h2>
        {carListings.map((listing, index) => (
          <Listing
            key={index}
            index={index}
            listing={listing}
            markSold={markSold}
            markUnsold={markUnsold}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
