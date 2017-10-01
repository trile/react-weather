import axios from 'axios';

const API_KEY = 'da59c22dcb14a57e3d3d61d7f986db8e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}`;

import {
  FETCH_WEATHER_LOADING,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_NOT_FOUND
} from './types';

export function fetchWeatherLoading(loadingStatus) {
  return {
    type: FETCH_WEATHER_LOADING,
    payload: loadingStatus
  }
}

export function weatherFetchError(errStatus) {
  return {
    type: FETCH_WEATHER_ERROR,
    payload: errStatus
  }
}

export function weatherFetchNotFound(status) {
  return {
    type: FETCH_WEATHER_NOT_FOUND,
    payload: status
  }
}

export function weatherFetchSuccess(data) {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: data
  }
}

export const fetchWeather = city => async dispatch => {
  const url = `${ROOT_URL}&q=${city},us`;

  dispatch(weatherFetchError(false));
  dispatch(weatherFetchNotFound(false));
  dispatch(fetchWeatherLoading(true));

  try {
    const res = await axios.get(url);
    fetchWeatherLoading(false);
    dispatch(weatherFetchSuccess(res));
  }
  catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        dispatch(weatherFetchNotFound(true));
      }
      else {
        console.log(error.response)
        dispatch(weatherFetchError(true));
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      dispatch(weatherFetchError(true));
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch(weatherFetchError(true));
    }
  };
}
