import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LeftData.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import moment from "moment";

function LeftData() {
  const [selected_value, setselected_value] = useState("USD");
  const [prices, setprices] = useState([]);
  const [rate, setrate] = useState("");

  const [{ currency }, dispatch] = useStateValue();
  useEffect(() => {
    let get = async () => {
      await axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((res) => {
          // console.log(res.data);
          setprices(res.data.bpi);
          // console.log(prices, selected_value);
          // console.log(prices.selected_value);

          // console.log(prices[selected_value].rate, "ello");
          setrate(
            `${prices[selected_value].rate} ${prices[selected_value].description}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // dispatch({
    //   type: actionTypes.CHANGE_CURRENCY,
    //   currency: selected_value,
    // });
    get();
  }, [prices, selected_value]);

  const handleChange = (e) => {
    // console.log();

    let currency_type = e.target.value;
    setselected_value(currency_type);
    setrate(
      `${prices[currency_type].rate} ${prices[currency_type].description}`
    );
    dispatch({
      type: actionTypes.CHANGE_CURRENCY,
      currency: currency_type,
    });
    console.log()
  };
  return (
    <div className="left__data">
      <h1>1 Bit coin equals to</h1>
      <select value={selected_value} onChange={handleChange}>
        <option value="USD">United States Dollar</option>
        <option value="GBP">British Pound Sterling</option>
        <option value="EUR">Euro</option>
      </select>
      <h1>{rate}</h1>
    </div>
  );
}

export default LeftData;
