import { useEffect, useState } from "react";

import "./App.css";

function App() {
  // State to manage the city name entered by the user
  const [city, setCity] = useState("Kolkata");

  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // Get the current date to display on the app
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()]; // Get the name of the current month
  const day = currentDate.getDay(); // Get the current day of the week (as a number)
  const year = currentDate.getFullYear(); // Get the current year
  const details = `${month} ${day}, ${year}`; // Format the date

  // API key for OpenWeatherMap
  const API_key = "11e56864810f6f7372448aa0a6e7d0a7";

  // Function to fetch weather data from the API
  const fetchWeatherData = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
      );
      const data = await resp.json();
      setWeatherData(data); // Update the state with the fetched data
    } catch (error) {
      console.log(error); // Log any errors during the fetch
    }
  };

  // Handle the form submission to fetch weather data for the entered city
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    fetchWeatherData(); // Fetch weather data for the entered city
  };

  // Fetch weather data when the component mounts
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Function to get the URL of the weather icon based on the weather condition
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgAF0oVl-BUl_-mOji7V1EvtdEDmDiditwJA8UG1ktE-b6d7whLbBns3PamCPh79T3_-6QMLKf-EpA2nBQJGjgSxr68F_Psnhp6-tKDsF5CuY6mp3UBVCSkl772BCArqeOWK0PiyaciRiqF3xWMYV0pACjh17Yr5Nc1TjpPdspW_9IM5PaHxaVTrECnR9I/s1600-rw/thunder.png";
      case "Rain":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVUNlnLPTPyeQBBTHTY7nBxlRgltMyfiBbgeZmVCCtmBzUg8rkHi_-chBFvvaGp7bALUWaI9dDLtkjBqtg-7bpUi3UMGcMpLhj47RuZCRzKn-yEoClV_4LyIEF2TT_jzvuEeHQ0ZQ9crYj3IN4w_tSc64g0nY8s3bUDN-hPAGQdPIimPeLS7FmMb77FeM/s1600-rw/rain_with_cloud.png";
      case "Mist":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpu91mcuhE3BLOuUQh2JQ6s6rjkUbiU02nW8Xk9LyjtcGkaB2sqNPGPzRfS-ciPZkixdbvP2pOpt7G-Y4W9ApDSKYrpzdYRvqEtNJVrgVma-3VgXIKMG3BkvWC1Y_MwNBrgLuRXymP6uy48qNJIumRiXfYRFcFIMP4PypU5L9CtBI5gA4ZzvvJ9cpmFMo/s1600-rw/sun.png";
      case "Haze":
        return "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBt8IfXcCCEpLXS_c_nFbb4PjibvrOZwWOml7uLHZS7-xIvRhG0Wgn00OGYJwVk42bMlaTdZiBw6-CXgJwXzWw-2TJOLAMEb3bo36MGixXL3H4MN-6vQ59LDvR5DgIToVel9qRK5KNQpPFaTUnK2sqTWVyUbknuJ6eXxItDyE-p2kBf_-Ds1Feeylg8oU/s1600-rw/Tornado.png";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {/* Render weather data only when it is available */}
        {weatherData && (
          <>
            <h1 className="container_date">{details}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>

              {/* Display the weather icon */}
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
              />

              {/* Display temperature and weather condition */}
              <h2 className="container_degree">{`${weatherData.main.temp} K`}</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>

              {/* Form to input city name */}
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => {
                    setCity(e.target.value); // Update the city state on input change
                  }}
                  placeholder="Enter City name"
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
