import React, { useState } from "react";
import Listing from "./components/Listing";
import ListingForm from "./components/ListingForm";

function App() {
  const [carListings, setCarListing] = useState([]);

  const addListing = (text) => {
    const newListing = [...carListings, { text }];
    setCarListing(newListing);
  };

  return (
    <div className="App">
      <h1>Cars</h1>
      <ListingForm addListing={addListing} />
      <div className="car-list">
        {carListings.map((listing, index) => (
          <Listing key={index} index={index} make="toyota" model="sienna" />
        ))}
      </div>
    </div>
  );
}

export default App;
