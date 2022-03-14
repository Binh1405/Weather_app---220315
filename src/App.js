import React, { useEffect, useState } from "react";
const api = {
  key: "ed94b51ba3521fda3c7d7ad1579c24c5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        console.log("url", url);
        const response = await fetch(url);
        const data = response.json();
        if (response.ok) {
          setWeatherInfo(JSON.stringify(data));
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
      console.log("searching");
    };
    fetchWeatherData();
  }, [searchCity]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        type="text"
        action=""
        placeholder="City"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      ></form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
};

export default App;
