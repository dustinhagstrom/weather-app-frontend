import React, { Component } from "react";

export class WeatherSection extends Component {
  render() {
    const { location, country, description, temperature } = this.props;
    return (
      <table className="weather-table">
        <tbody>
          <th>Our Current Weather</th>
          <tr>
            <span>Location: </span>
            {location}
          </tr>
          <tr>
            <span>Country: </span>
            {country}
          </tr>
          <tr>
            <span>Description: </span>
            {description}
          </tr>
          <tr>
            <span>Temperature: </span>
            {temperature}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default WeatherSection;
