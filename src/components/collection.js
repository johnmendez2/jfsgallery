import React, { useState, useEffect } from "react";
import { fs } from "./Config/config";
import DarkNavbar from "./darknavbar";
import MobileNavbar from "./mobilenavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/collection.css";
import { useNavigate } from "react-router-dom";
export default function Collection() {
  const [shirtsArray, setShirtsArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [filteredShirts, setFilteredShirts] = useState([]);
  const [originalShirtsArray, setOriginalShirtsArray] = useState([]); // Added state for the original array
  const leagues = ["Premier League", "Laliga", "Ligue 1"];
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await fs.collection("JFSGallery").get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          frameImage: doc.data().frameImage,
          shirtname: doc.data().shirtname,
          price: doc.data().price,
          league: doc.data().league,
        }));
        setShirtsArray(data);
        setOriginalShirtsArray(data); // Store the original array
        setFilteredShirts(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const applyFilters = () => {
    // Apply filters based on price range and selected leagues
    const filteredShirts = shirtsArray.filter((shirt) => {
      const shirtPrice = parseFloat(shirt.price.split("$")[1]);
      return (
        shirtPrice >= priceRange.min &&
        shirtPrice <= priceRange.max &&
        (selectedLeagues.length === 0 ||
          selectedLeagues.includes(shirt.league))
      );
    });

    // Update visible shirts based on filters
    setFilteredShirts(filteredShirts);

    // Close the filter popup
    setShowFilterPopup(false);
  };

  const resetFilters = () => {
    // Reset filters by restoring the original array
    setFilteredShirts(originalShirtsArray);
    // Clear selected leagues and reset price range
    setSelectedLeagues([]);
    setPriceRange({ min: 0, max: 500 });
    // Close the filter popup
    setShowFilterPopup(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleShirts = filteredShirts.slice(startIndex, endIndex);

  return (
    <div>
      <div className={`desktop ${showFilterPopup ? "blurred" : ""}`}>
        <DarkNavbar whiteBackground />
        <div className="search-and-grid-container">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={() => setShowFilterPopup(true)}>
              <FontAwesomeIcon
                icon={faSliders}
                style={{
                  fontSize: "1.6vw",
                  color: "black",
                  fontWeight: "300",
                }}
              />
            </button>
          </div>
          <div className="shirts-grid">
            {visibleShirts.map((shirt) => (
                shirt.shirtname.toLowerCase().includes(searchTerm.toLowerCase()) && (
 
              <div key={shirt.id} className="shirt-item">
                <img               onClick={() => {
                // Navigate to /shirtpage when clicking on the image
                navigate(`/id/${shirt.id}`);
              }} src={shirt.frameImage} alt={shirt.shirtname} />
                <h1 className="titlejsy">{shirt.shirtname}</h1>
                <h2 className="price">{shirt.price}</h2>
              </div>
            )))}
          </div>

          {filteredShirts.length > itemsPerPage && (
            
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span className="pagenumber">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= filteredShirts.length}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
        {showFilterPopup && (
          <div className="filter-popup-container">
            <div className="filter-popup">
              <button
                className="close-button"
                onClick={() => setShowFilterPopup(false)}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    fontSize: "1.5vw",
                    color: "black",
                    fontWeight: "300",
                  }}
                />
              </button>

              {/* Price Range Slider */}
              <div className="neumorphic-slider">
                <label className="filterheading">Filters</label>
                <label>Price Range</label>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: parseFloat(e.target.value),
                    })
                  }
                />
                <div className="slider-values">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>

              {/* League Filter Buttons */}
              <div className="neumorphic-buttons">
                <label>Leagues</label>
                {/* Assume leagues is an array of available leagues */}
                {leagues.map((league) => (
                  <button
                    key={league}
                    className={
                      selectedLeagues.includes(league) ? "active" : ""
                    }
                    onClick={() => {
                      setSelectedLeagues((prevLeagues) => {
                        if (prevLeagues.includes(league)) {
                          return prevLeagues.filter(
                            (prevLeague) => prevLeague !== league
                          );
                        } else {
                          return [...prevLeagues, league];
                        }
                      });
                    }}
                  >
                    {league}
                  </button>
                ))}
              </div>
            {/* Button Container */}
            <div className="button-container">
              {/* Apply Filters Button */}
              <button className="apply-filters-button" onClick={applyFilters}>
                Apply
              </button>

              {/* Reset Filters Button */}
              <button className="apply-filters-button" onClick={resetFilters}>
                Reset
              </button>
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="mobile">
        <MobileNavbar whiteBackground />
        {/* Render mobile version with single item per row */}
        <div className="search-and-grid-container">
          <div className="mobile-search-bar-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={() => setShowFilterPopup(true)}>
              <FontAwesomeIcon
                icon={faSliders}
                style={{
                  fontSize: "1.6rem",
                  color: "black",
                  fontWeight: "300",
                }}
              />
            </button>
          </div>
          
          {/* Filter Popup for Mobile */}
          {showFilterPopup && (
            <div className="mobile-filter-popup-container">
              <div className="mobile-filter-popup">
                <button
                  className="mobile-close-button"
                  onClick={() => setShowFilterPopup(false)}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{
                      fontSize: "1.5rem",
                      color: "black",
                      fontWeight: "300",
                    }}
                  />
                </button>

                {/* Price Range Slider */}
                <div className="neumorphic-slider">
                  <label className="filterheading">Filters</label>
                  <label>Price Range</label>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseFloat(e.target.value),
                      })
                    }
                  />
                  <div className="slider-values">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>

                {/* League Filter Buttons */}
                <div className="neumorphic-buttons">
                  <label>Leagues</label>
                  {/* Assume leagues is an array of available leagues */}
                  {leagues.map((league) => (
                    <button
                      key={league}
                      className={
                        selectedLeagues.includes(league) ? "active" : ""
                      }
                      onClick={() => {
                        setSelectedLeagues((prevLeagues) => {
                          if (prevLeagues.includes(league)) {
                            return prevLeagues.filter(
                              (prevLeague) => prevLeague !== league
                            );
                          } else {
                            return [...prevLeagues, league];
                          }
                        });
                      }}
                    >
                      {league}
                    </button>
                  ))}
                </div>

                {/* Button Container */}
                <div className="mobile-button-container">
                  {/* Apply Filters Button */}
                  <button
                    className="mobile-apply-filters-button"
                    onClick={applyFilters}
                  >
                    Apply
                  </button>

                  {/* Reset Filters Button */}
                  <button
                    className="mobile-apply-filters-button"
                    onClick={resetFilters}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
          {filteredShirts.map((shirt) => (
            shirt.shirtname.toLowerCase().includes(searchTerm.toLowerCase()) && (
 
            <div key={shirt.id} className="mobile-shirt-item">
              <img
                className="mobile-image"
                src={shirt.frameImage}
                alt={shirt.shirtname}
                onClick={() => {
                    // Navigate to /shirtpage when clicking on the image
                    navigate(`/id/${shirt.id}`);
                  }} 
              />
              <h1 className="mobile-titlejsy">{shirt.shirtname}</h1>
              <h2 className="mobile-price">{shirt.price}</h2>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}
