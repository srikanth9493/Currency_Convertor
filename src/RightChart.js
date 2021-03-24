import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useStateValue } from "./StateProvider";
import "./RightChart.css";
import moment from "moment";
function RightChart() {
  const [price_history, setprice_history] = useState([]);
  const [name, setname] = useState([]);
  const [data, setdata] = useState([]);
  const [{ currency }, dispatch] = useStateValue();
  const [startdate, setstartdate] = useState("2013-09-01");
  const [enddate, setenddate] = useState("2013-09-30");
  useEffect(() => {
    axios
      .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startdate}&end=${enddate}`
      )
      .then((res) => {
        // console.log(res);
        setprice_history(res.data.bpi);
        // console.log(res.data.bpi);
        // let x = createData(res.data.bpi);
        let x = createData(res.data.bpi);
        console.log(x, "hai");
        setdata(x);
        drawChart();
        // console.log(price_history);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(data);
  }, [currency, startdate, enddate]);

  //   useEffect(() => {

  //   }, [currency]);

  useEffect(() => {
    setdata(data);
    drawChart();
  }, [data]);

  //   console.log(data, "data is wealth");
  let createData = (data) => {
    let chardata = [];
    for (let i in data) {
      chardata.push({
        x: i,
        y: data[i],
      });
    }

    return chardata;
  };

  var options = {
    chart: {
      height: 280,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: data,
      },
    ],

    xaxis: {
      type: "datetime",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  let drawChart = () => {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  };

  let getData = (e) => {
    console.log(e);
    e.preventDefault();
    let start = e.target.start.value;
    let end = e.target.end.value;
    setstartdate(start);
    setenddate(end);

    console.log(start, end);
  };

  //   let chart = document.querySelector("#chart");

  return (
    <div className="rightchart">
      <form onSubmit={getData} className="rightchart__form">
        <input name="start" type="date"></input>
        <input name="end" type="date"></input>
        <button type="submit">Get Data</button>
      </form>
      <div className="chart" id="chart"></div>
    </div>
  );
}

export default RightChart;
