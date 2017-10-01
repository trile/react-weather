import {
  FETCH_WEATHER_LOADING,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  FETCH_WEATHER_NOT_FOUND
} from '../actions/types';

export function fetchWeatherLoading(state = false, action) {
  switch (action.type) {
    case FETCH_WEATHER_LOADING:
      return action.payload
    default:
      return state;
  }
}

export function fetchWeatherError(state = false, action) {
  switch (action.type) {
    case FETCH_WEATHER_ERROR:
      return action.payload
    default:
      return state;
  }
}

export function fetchWeatherNotFound(state = false, action) {
  switch (action.type) {
    case FETCH_WEATHER_NOT_FOUND:
      return action.payload
    default:
      return state;
  }
}


export function fetchWeatherSuccess(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      //sanitize state to prevent duplicates
      var sanState = state.filter((item) => {
        return item.city.id != action.payload.data.city.id
      });
      // always remember to return a new instance of state, not manipulate it.
      return [action.payload.data, ...sanState]; // similar to return state.concate([ action.payload.data ]);
    default:
      return state;
  }
}
