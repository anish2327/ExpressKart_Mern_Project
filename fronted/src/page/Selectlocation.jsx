import React, { useState } from "react";

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

    if (!country || !state || !city) {
      alert("⚠️ Please select all fields before saving.");
      return;
    }

    const formattedLocation = ` ${houseNo} ,${city}, ${state}, ${country} - ${pincode}`;
    setSavedLocation(formattedLocation);
    localStorage.setItem("savedLocation", formattedLocation); 
  };


  return (
    <div className="p-4 max-w-md mx-auto rounded-2xl shadow-md bg-white">
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
  );
};

export default SelectLocation;
