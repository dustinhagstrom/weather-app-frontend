import React from "react";

import Header from "./components/Header/Header";
import Weather from "./components/WeatherInfo/Weather";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Weather />
    </div>
  );
}

export default App;
