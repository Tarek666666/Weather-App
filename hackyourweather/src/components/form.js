import { useState, useEffect } from "react";
import "../App.css";
import { WeatherData } from "../components/weather";

export default function From() {
    const [cityName, setCityName] = useState("");
    const [cityWeather, setCityWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [searchError, setSearchError] = useState(false);

    const handleCityName = (e) => {
        setCityName(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchError(false);

        if (!cityName) {
            setSearchError(true);

            return;
        }

        setIsLoading(true);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Something went wrong with fetching data");
                    setIsLoading(false);
                    setError(true);
                }
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                setSearchError(false);
                setError(false);

                const searchedCityObj = {
                    name: data.name,
                    sys: data.sys.country,
                    temp: data.main.temp,
                    maxTemp: data.main.temp_max,
                    minTemp: data.main.temp_min,
                    id: data.id,
                    description: data.weather[0].description,
                    weather: data.weather[0].main,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                };
                setCityWeather(searchedCityObj);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(true);
            });
    };

    return (
        <div>
            <form className='form' onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder='Search City'
                    className='searchBar'
                    onChange={handleCityName}
                    value={cityName}
                />
                <input type='submit' value='Search' className='submitBtn' />
            </form>
            {hasError && !isLoading && !searchError && (
                <p className={'search-error'}>Please Enter a Valid City Name .</p>
            )}
            {searchError && <p className={'search-error'}>You can't leave the search bar empty</p>}
            {isLoading && !hasError && <p>Loading .....</p>}
            {!cityWeather && !hasError && !isLoading && !searchError && (
                <p className={'search-bar-empty'}>You Have not entered a City name  to search for it!!</p>
            )}

            {cityWeather && !isLoading && !hasError && !searchError && (
                <WeatherData cityWeather={cityWeather} />
            )}
        </div>
    );
}


