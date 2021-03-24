import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LeftData from "./LeftData";
import RightChart from "./RightChart";
function App() {
  return (
    <div className="App">
      <div className="app__container">
        <LeftData></LeftData>
        <RightChart></RightChart>
      </div>
    </div>
  );
}

export default App;
