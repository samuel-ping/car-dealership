import React, { useState, useEffect } from "react";

import axios from "axios";

import Listing from "./components/Listing";
import ListingForm from "./components/ListingForm";

function App() {
  const [carListings, setCarListings] = useState([]);

  // retrieves listings from server
  useEffect(() => {
    axios
      .get("http://localhost:5000/listings")
      .then((res) => {
        console.log(res.data);
        setCarListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // pass empty array in second parameter to prevent useEffect from retriggering (https://stackoverflow.com/a/53243204/13026376)

  const addListing = (newListing) => {
    // axios
    //   .post("http://localhost:5000/listings", newListing)
    //   .then(() => {
    //     alert("Listing added!");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
      <br />
      <div>
        <button
          onClick={() => {
            axios.get("http://localhost:5000/listings/stats").then((res) => {
              console.log(res.data);
              alert(JSON.stringify(res.data));
            });
          }}
        >
          Get Stats
        </button>
      </div>
    </div>
  );
}

export default App;
