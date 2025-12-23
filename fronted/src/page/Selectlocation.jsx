import React, { useState } from "react";
import selectlocation from "../assets/select_location.jpg"

const SelectLocation = () => {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    houseNo: "",
    pincode :"",
  });

  const [savedLocation, setSavedLocation] = useState("");

  const countries = {
    India: ["Uttar Pradesh", "Maharashtra", "Delhi", "Gujrat"],
    USA: ["California", "Texas", "New York"],
  };

  const cities = {
    "Uttar Pradesh": ["Ballia", "Lucknow", "Varanasi"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["NorthWest ", "North", "East", "west"],
    Gujrat : ["Ankleshwar","Baruch" ],
    Texas: ["Dallas", "Houston"],
    "New York": ["NYC", "Buffalo"],
  };
  const houseNO= {

  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "", city: "" } : {}),
      ...(name === "state" ? { city: "" } : {}),
    }));
  };


  const handleSaveAddress = (e) => {
    e.preventDefault();
    const { country, state, city, houseNo, pincode } = location;

    if (!country || !state || !city  || !houseNO || !pincode) {
      alert("⚠️ Please select all fields before saving.");
      return;
    }

    const formattedLocation = ` ${houseNo} ,${city}, ${state}, ${country} - ${pincode}`;
    setSavedLocation(formattedLocation);
    localStorage.setItem("savedLocation", formattedLocation); 
  };


  return (
    <div className="flex items-start justify-start ml-10 min-h-screen bg-gradient-to-r from-blue-200 via-pink-50 to-rose-100">
  {/* Left side image */}
  <div className="w-1/2 flex flex-col justify-start items-start ">
  
    <img 
      src={selectlocation}
      alt="select location"
      className="rounded-2xl shadow-md mt-2 w-[90%] object-cover"
    />
      <p className="mt-6 text-2xl font-semibold text-gray-800 text-center">
      🚀 Fast Delivery with <span className="text-orange-500">ExpressKart</span>
    </p>
      <div className=" mt-2 flex gap-3 bg-slate-200 w-36 px-2 items-center rounded-full">
            <p className="mt-1  text-xl font-semibold text-gray-800 text-center">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-12"
            />
        </div>
  
  </div>
    <div className="w-1/3 p-6 rounded-2xl shadow-md bg-white ml-10 mt-2">
      <h2 className="text-xl font-bold text-gray-700 mb-3">Select Your Location</h2>

      {/* Country */}
      <label className="block mb-2 font-medium">Country:</label>
      <select
        name="country"
        value={location.country}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full mb-3"
      >
        <option value="">-- Select Country --</option>
        {Object.keys(countries).map((country) => (
          <option key={country}>{country}</option>
        ))}
      </select>

      {/* State */}
      {location.country && (
        <>
          <label className="block mb-2 font-medium">State:</label>
          <select
            name="state"
            value={location.state}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full mb-3"
          >
            <option value="">-- Select State --</option>
            {countries[location.country].map((st) => (
              <option key={st}>{st}</option>
            ))}
          </select>
        </>
      )}

      {/* City */}
      {location.state && (
        <>
          <label className="block mb-2 font-medium">City:</label>
          <select
            name="city"
            value={location.city}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full mb-3"
          >
            <option value="">-- Select City --</option>
            {cities[location.state]?.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </>
      )}

      <label  className="block mb-2 font-medium"> PIN code</label>
        <input
        type="text"
        name="pincode"
        value={location.pincode}
        onChange={handleChange}
        placeholder="Enter your PIN code number "
        className="border rounded-lg p-2 w-full mb-3"
        />

      <label className="block mb-2 font-medium">House No. / Address Line:</label>
      <input
        type="text"
        name="houseNo"
        value={location.houseNo}
        onChange={handleChange}
        placeholder="Enter your house number or address"
        className="border rounded-lg p-2 w-full mb-3"
        />
        

     {/* Save Address Button */}
      <button
        onClick={handleSaveAddress}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Save Address
      </button>

      {/* Display Saved Location */}
      {savedLocation && (
        <div className="mt-4 p-3 border rounded-lg bg-green-50 text-green-700">
          <strong>📍 Saved Location:</strong> {savedLocation}
        </div>
      )}
    </div>
    </div>
  );
};

export default SelectLocation;
