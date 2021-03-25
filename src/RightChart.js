import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useStateValue } from "./StateProvider";
import "./RightChart.css";
import moment from "moment";
function RightChart() {
  const [{ currency }, dispatch] = useStateValue();
  const [startdate, setstartdate] = useState("2013-09-01");
  const [enddate, setenddate] = useState("2013-09-30");
  const [param, setparam] = useState("");

  console.log("param", param);

  const getData = (list) => {
    setparam({
      options: {
        chart: {
          height: 280,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
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
      },
      series: [
        {
          data: list,
        },
      ],
    });
  };
  useEffect(() => {
    axios
      .get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${startdate}&end=${enddate}`
      )
      .then((res) => {
        let data = res.data.bpi;
        console.log(data, "this data");
        let list = [];
        for (let i in data) {
          list.push({
            x: i,
            y: data[i],
          });
        }
        console.log(list);
        getData(list);
      });
  }, [currency, startdate, enddate]);

  console.log("rerender");

  let handleData = (e) => {
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
      <form onSubmit={handleData} className="rightchart__form">
        <input name="start" type="date"></input>
        <input name="end" type="date"></input>
        <button type="submit">Get Data</button>
      </form>
      {Object.keys(param).length > 0 && (
        <Chart
          options={param.options}
          series={param.series}
          type="area"
          width="500"
        />
      )}
    </div>
  );
}

export default RightChart;
