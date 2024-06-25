import React, { useEffect, useState, useRef } from 'react';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
import low from '../assets/low.png';
import high from '../assets/high.png';
import cloudy from '../assets/cloudy.png';
import rain from '../assets/rain.png';
import drizzle from '../assets/drizzle.png';
import thunder from '../assets/thunder.png';
import snow from '../assets/snow.png';
import mist from '../assets/mist.png';

const Details = ({ imgsrc, altsrc, p1, p2 }) => (
  <div className='flex flex-col sm:flex-row mx-2 items-center justify-center text-center sm:text-left'>
    <img className='w-12 h-12 mr-0 sm:mr-2 mb-2 sm:mb-0' src={imgsrc} alt={altsrc} />
    <div>
      <p className='text-3xl font-medium sm:text-4xl sm:font-semibold'>{p1}</p>
      <p >{p2}</p>
    </div>
  </div>
);

const Weather = () => {
  const [details, setDetails] = useState(null);
  const inputRef = useRef();

  const icons = {
    "01d": clear,
    "01n": clear,
    "02d": clear,
    "02n": clear,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "04n": cloudy,
    "09d": rain,
    "09n": rain,
    "10d": drizzle,
    "10n": drizzle,
    "11d": thunder,
    "11n": thunder,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fd5671ae72d18ee0509955d32c83f217`
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = icons[data.weather[0].icon] || clear;
      setDetails({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        low: Math.floor(data.main.temp_min),
        high: Math.floor(data.main.temp_max),
        place: data.name,
        speed: data.wind.speed,
        icon: icon,
        des: data.weather[0].description,
      });
    } catch (e) {
      setDetails(null);
      console.error("Error in fetching data!");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (

    <div className='text-black flex flex-col gap-4 items-center bg-white w-8/12 sm:w-1/2 lg:w-3/4  p-5 rounded-2xl min-h-screen my-10'>
      {/* Search */}
      <div className='flex justify-center w-full'>
        <input ref={inputRef} className='rounded-full p-3 w-full sm:w-1/2 border border-blue-400' type="text" placeholder='Enter city name' />
        <button onClick={() => search(inputRef.current.value)} className='ml-2 text-white bg-blue-400 rounded-full w-20 text-xs font-semibold sm:text-[15px] sm:font-none sm:w-32'>Search</button>
      </div>

      {details ? (
        <>
          <p className='text-4xl sm:text-5xl lg:text-8xl'>{details.temp}°C</p>
          <img className='w-32' src={details.icon} alt="weather icon" />
          <p className='text-xl'>{details.des}</p>
          <p className='text-xl sm:text-4xl lg:text-6xl font-semibold'>{details.place}</p>

          <div className='text-white w-full mt-5 lg:h-48 flex flex-col gap-10 lg:gap-5 lg:flex-row bg-blue-400  rounded-3xl p-4 lg:p-6 justify-center items-center'>
            <Details imgsrc={humidity} altsrc="humidity image" p1={`${details.humidity}%`} p2="Humidity" />
            <Details imgsrc={wind} altsrc="wind image" p1={`${details.speed} kmph`} p2="Wind Speed" />
            <Details imgsrc={low} altsrc="Low temp image" p1={`${details.low}°C`} p2="Low temp" />
            <Details imgsrc={high} altsrc="High temp image" p1={`${details.high}°C`} p2="High temp" />
          </div>
        </>
      ) : (
        <p className='text-xl mt-10'>No weather details available. Please search for a city.</p>
      )}
    </div>

  );
};

export default Weather;
