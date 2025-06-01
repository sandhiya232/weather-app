import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const getBackgroundURL = (condition) => {

    const bgImages = {
      clear: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1950&q=80',
      clouds: 'https://wallpaperaccess.com/full/5466358.jpg',
      rain: 'http://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Background-HD.jpg',
      snow: 'https://images.wallpapersden.com/image/download/winter-trees-snow-season_am5uaGeUmZqaraWkpJRqaWxnrWhrZWs.jpg',
      default: 'https://c02.purpledshub.com/uploads/sites/41/2023/06/GettyImages-1403448601-tb-01213a2.jpg',
    };

    return bgImages[condition.toLowerCase()] || bgImages.default;
  };

  const getWeather = async () => {
    if (!city) return;

    try {
      const apiKey = 'b394e04a02abe6e52c156fffecffcf73'; 
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError(data.message);
      }
    } catch {
      setWeatherData(null);
      setError('Failed to fetch weather');
    }
  };

  const backgroundImage = weatherData
    ? getBackgroundURL(weatherData.weather[0].main)
    : getBackgroundURL('default');

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

         {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white bg-opacity-80 px-4 py-2 rounded hover:bg-opacity-100 transition"
      >
        ← Back to Home
      </button>
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Checker</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={getWeather}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Check Weather
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {weatherData && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
            <p className="text-2xl font-bold">{weatherData.main.temp} °C</p>
          </div>
        )}
      </div>
    </div>
  );
}
