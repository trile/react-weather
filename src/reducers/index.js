import { combineReducers } from 'redux';
import { fetchWeatherSuccess, fetchWeatherLoading, fetchWeatherError, fetchWeatherNotFound } from './reducer_weather';

const rootReducer = combineReducers({
  weather: fetchWeatherSuccess,
  weather_loading: fetchWeatherLoading,
  weather_error: fetchWeatherError,
  weather_not_found: fetchWeatherNotFound
});

export default rootReducer;
