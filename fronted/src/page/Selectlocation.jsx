import React, { useState } from "react";

const SelectLocation = () => {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    detected: "",
  });

  // Example static data (you can replace with dynamic API data)
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


  // Handle manual select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "", city: "" } : {}),
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  // Detect current location
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setLocation((prev) => ({
              ...prev,
              detected: `${data.address.city || data.address.town || ""}, ${data.address.state}, ${data.address.country}`,
            }));
          } catch (err) {
            console.error("Error fetching location:", err);
          }
        },
        (error) => {
          alert("Please allow location access.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
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

      {/* Detect current location */}
      <button
        onClick={handleDetectLocation}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Detect My Location
      </button>

      {location.detected && (
        <p className="mt-3 text-green-600 font-medium">
          📍 Detected Location: {location.detected}
        </p>
      )}
    </div>
  );
};

export default SelectLocation;
