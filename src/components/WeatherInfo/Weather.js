import React, { Component } from "react";
import axios from "axios";

import "./Weather.css";
import LocationList from "../LocationList/LocationList";
import WeatherSection from "../WeatherInfo/WeatherSection";

const URL = "http://localhost:8081";
export class Weather extends Component {
  state = {
    locationList: [],
    locationInput: "",
    error: null,
    errorMessage: "",
    currentLocation: "",
    country: "",
    description: "",
    temperature: "",
  };

  async componentDidMount() {
    try {
      let allLocations = await axios.get(
        `${URL}/api/location/get-all-searched-locations`
      );
      this.setState({
        locationList: allLocations.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleLocationOnChange = (event) => {
    this.setState({
      locationInput: event.target.value,
      error: null,
      errorMessage: "",
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    let q = this.state.locationInput;

    if (this.state.locationInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: "Cannot enter a blank location!",
      });
    } else {
      try {
        let fetchAPIkeyData = await axios.get(`${URL}/api/appid/get-api-key`);
        let appid = fetchAPIkeyData.data.payload;
        let enterredLocation = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}&units=imperial`
        );
        let savedLocation = await axios.post(
          `${URL}/api/location/add-location`,
          { location: this.state.locationInput }
        );
        console.log(enterredLocation.data.name);
        console.log(enterredLocation.data.weather[0].description);
        console.log(enterredLocation.data.main.temp);
        let newArray = [
          ...this.state.locationList,
          {
            location: savedLocation.data.payload.location,
            _id: savedLocation.data.payload._id,
          },
        ];
        this.setState({
          locationList: newArray,
          locationInput: "",
          currentLocation: enterredLocation.data.name,
          country: enterredLocation.data.sys.country,
          description: enterredLocation.data.weather[0].description,
          temperature: enterredLocation.data.main.temp.toFixed() + " F",
        });
      } catch (e) {
        this.setState({
          error: true,
          errorMessage:
            "Sorry, the city you entered doesn't match any cities in our system!",
        });
      }
    }
  };

  handleDeleteByID = async (_id) => {
    try {
      let deletedLocation = await axios.delete(
        `${URL}/api/location/delete-location-by-id/${_id}`
      );
      let filteredArray = this.state.locationList.filter(
        (location) => location._id !== deletedLocation.data.payload._id
      );
      this.setState({
        locationList: filteredArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              type="text"
              className="weather-input"
              onChange={this.handleLocationOnChange}
              value={this.state.locationInput}
              autoFocus
            />
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>

          {this.state.errorMessage && (
            <div style={{ color: "red", fontSize: "20px" }}>
              {this.state.errorMessage}
            </div>
          )}
        </div>
        <div className="main-wrap">
          <table className="all-locations">
            <tr>
              <th colSpan="2">Recently Searched Locations</th>
            </tr>
            {this.state.locationList.map((item) => {
              return (
                <LocationList
                  location={item}
                  key={item._id}
                  handleDeleteByID={this.handleDeleteByID}
                />
              );
            })}
          </table>
          <WeatherSection
            location={this.state.currentLocation}
            country={this.state.country}
            description={this.state.description}
            temperature={this.state.temperature}
          />
        </div>
      </div>
    );
  }
}

export default Weather;
