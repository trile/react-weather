import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    // console.log(event.target.value);
    this.setState({term:event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch weather data
    this.props.fetchWeather(this.state.term);
    this.setState({term: ''});
  }

  render() {
    let error = null;
    if (this.props.weather_not_found)
      error = <div className="alert alert-danger" role="alert">Cannot find the city you have entered</div>
    if (this.props.weather_error)
      error = <div className="alert alert-danger" role="alert">Error connecting to server</div>

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Get a five-day forcast in your favorite cities"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
        {error}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWeather}, dispatch);
}
function mapStateToProps({weather_loading, weather_error, weather_not_found}) {
  return {
    weather_loading,
    weather_error,
    weather_not_found
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
