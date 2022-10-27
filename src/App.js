import GaugeChart from "@alexnavis/react-gauge-chart2";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
 const client = axios.create({
  baseURL: "https://20.168.8.95:1880/modbus",
 });

 const [posts, setPosts] = useState({
  amp_meter: 0,
  cos_phi: 0,
  frequency: 0,
  kwh_meter: 0,
  price_idr: 0,
  temp_celcius: 0,
  timestamp: 0,
  volt_meter: 0,
  watt_meter: 0,
 });

 useEffect(() => {
  const timer = setTimeout(() => {
   client.get("?FC=3&ID=1&ADR=0&QTY=8&TYPE=INT16").then((response) => {
    setPosts(response.data);
   });
  }, 2000);

  return () => {
   clearTimeout(timer);
  };
 });

 return (
  <section className="bg-slate-900 min-h-screen">
   <div className="container mx-auto flex items-center pt-20">
    <div className="w-1/3">
     <GaugeChart id="gauge-chart1" colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.volt_meter / 10000} formatTextValue={(value) => value + ""} animDelay={0} /> <h1 className="text-center text-white text-3xl">Voltmeter (V)</h1>
    </div>
    <div className="w-1/3">
     <GaugeChart id="gauge-chart2" nrOfLevels={15} colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.amp_meter / 10000} formatTextValue={(value) => value + ""} /> <h1 className="text-center text-white text-3xl">Ampremeter (A)</h1>
    </div>
    <div className="w-1/3">
     <GaugeChart id="gauge-chart3" nrOfLevels={15} colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.watt_meter / 10000} formatTextValue={(value) => value + ""} /> <h1 className="text-center text-white text-3xl">Wattmeter (W)</h1>
    </div>
   </div>
   <div className="container mx-auto flex items-center pt-20">
    <div className="w-1/3">
     <GaugeChart id="gauge-chart4" nrOfLevels={15} colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.kwh_meter / 10000} formatTextValue={(value) => value + ""} /> <h1 className="text-center text-white text-3xl">KwHmeter</h1>
    </div>
    <div className="w-1/3">
     <GaugeChart id="gauge-chart5" nrOfLevels={15} colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.frequency / 10000} formatTextValue={(value) => value + ""} /> <h1 className="text-center text-white text-3xl">frequency (Hz)</h1>
    </div>
    <div className="w-1/3">
     <GaugeChart id="gauge-chart6" nrOfLevels={15} colors={["#FF5F6D", "#FFC371"]} arcWidth={0.2} percent={posts.cos_phi / 10000} formatTextValue={(value) => value + ""} /> <h1 className="text-center text-white text-3xl">Cosh Phi (Pf)</h1>
    </div>
   </div>
   <h1 className="text-center text-white text-2xl mt-20">update time : {posts.timestamp}</h1>
  </section>
 );
}

export default App;
