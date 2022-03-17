import React, { useEffect, useState } from "react";
const api = {
  key: "ed94b51ba3521fda3c7d7ad1579c24c5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("Paris");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        console.log("url", url);
        const response = await fetch(url);
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.log("error", error);
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);
  return (
    <>
      <form onSubmit={handleSubmit} type="text" action="">
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>
              Location: {weatherInfo.name}, {weatherInfo.sys.country}
              <ul>
                <li>Feels like: {weatherInfo.main.feels_like}</li>
                <li>Humidity: {weatherInfo.main.humidity}</li>
                <li>Temperature: {weatherInfo.main.temp}</li>
                <li>Temp-max: {weatherInfo.main.temp_max}</li>
                <li>Temp-min: {weatherInfo.main.temp_min}</li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
