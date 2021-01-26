import cityWeatherData from "../city-weather.json";

export function WeatherData({ cityWeather }) {
    return (
        <div className='City-weather'>
            <h2>
                {cityWeather.name}, {cityWeather.sys}
            </h2>

            <p>
                {" "}
                <span>Weather:</span> {cityWeather.weather}
            </p>
            <p>
                <span>Description:</span> {cityWeather.description}
            </p>
            <p>
                <span>Temp: </span>
                {cityWeather.temp}º
            </p>
            <p>
                <span>Max_Temp: </span>
                {cityWeather.maxTemp}º
            </p>
            <p>
                <span>Min_Temp: </span>
                {cityWeather.minTemp}º
            </p>
            <p>
                <span>Location: </span> lat: {cityWeather.lat} , lon: {cityWeather.lon}{" "}
            </p>
        </div>
    );
}


