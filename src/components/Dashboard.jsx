import React, { Component } from "react";
import dashboardd from "../assets/dashboard.jpeg";
export default class Dashboard extends Component {
  render() {
    return (
      <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
        <div className="blur">
          <img src={dashboardd} alt="" loading="lazy" />
        </div>
        <div className="col-start-3 sepia blur">
          <img src={dashboardd} alt="" loading="lazy" />
        </div>
        <div className="saturate-200 blur">
          <img src={dashboardd} alt="" loading="lazy" />
        </div>
        <div className="grayscale blur">
          <img src={dashboardd} alt="" loading="lazy" />
        </div>
        <div className="row-start-1 col-start-2 col-span-2 invert blur">
          <img src={dashboardd} alt="" loading="lazy" />
        </div>
      </div>
    );
  }
}
