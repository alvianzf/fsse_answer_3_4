import '../assets/css/card.css';
import Clock from 'react-clock';
import { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';
import getCurrent from '../services/getWeather';

// Documentation on icons: https://openweathermap.org/weather-conditions

function Card() {
  const [clock, setClock] = useState(new Date());
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);

    const getInitialData = async () => {
      const initialData = await getCurrent('jakarta');
      setUpdates(initialData);
    } 

    getInitialData();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = (event: any) => {
    setLocation(event.target.value);
  };

  const setUpdates = (data) => {
    setWeatherData(data);
    setIcon(data.weather[0].main);
    setDescription(data.weather[0].description);
  }

  const handleLocation = async () => {
    const data = await getCurrent(location);
    console.log(data);
    setUpdates(data)
  };

  return (
    <div className='card'>
      <div className="search-section">
        <input name="search" placeholder="Search Location" className="location-search" onChange={handleChange}></input>
        <span className="material-symbols-outlined floated" onClick={handleLocation}>search</span>
      </div>
      <div className="clock">
        <Clock value={clock}/>
      </div>
      <div className="location">{weatherData?.name ?? '--'}</div>
      <div className="temp">{weatherData?.main?.temp ?? "--"}º</div>
      <div className="weather-icon">
        <span className={icon == "Clouds" ? "material-symbols-outlined active" : "material-symbols-outlined"}>partly_cloudy_day</span>
        <span className={icon == "Thunderstorm" ? "material-symbols-outlined active" : "material-symbols-outlined"}>thunderstorm</span>
        <span className={icon == "Rain" || icon == "Drizzle" ? "material-symbols-outlined active" : "material-symbols-outlined"}>rainy</span>
        <span className={icon == "Clear" ? "material-symbols-outlined active" : "material-symbols-outlined"}>sunny</span>
      </div>
      <div className="weather-description">{description ?? "--"}</div>
    </div>
  )
}

export default Card;
