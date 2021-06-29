import React, { Component } from "react";
import Button from "../common/Button";

import "./LocationList.css";
export class LocationList extends Component {
  render() {
    const { location, _id } = this.props.location;
    const { handleDeleteByID } = this.props;
    return (
      <tbody className="the-list">
        <tr>
          <td>{location}</td>
          <td>
            <Button clickFunc={() => handleDeleteByID(_id)} />
          </td>
        </tr>
      </tbody>
    );
  }
}

export default LocationList;
