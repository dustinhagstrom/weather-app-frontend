import React, { Component } from "react";

export class WeatherSection extends Component {
  render() {
    const { location, country, description, temperature } = this.props;
    return (
      <div className="weather-div">
        <div>
          <span>Location:</span>
          {location}
        </div>
        <div>
          <span>Country:</span>
          {country}
        </div>
        <div>
          <span>Description:</span>
          {description}
        </div>
        <div>
          <span>Temperature:</span>
          {temperature}
        </div>
      </div>
    );
  }
}

export default WeatherSection;
