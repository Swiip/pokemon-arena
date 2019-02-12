import React from "react";

// import { timeout } from "../../utils";

// import Loader from "../design-system/loader";
import BackButton from "../design-system/back-button";
import Page from "../design-system/page";
import Title from "../design-system/title";

// const Chart = lazy(async () => {
//   await timeout(2000);
//   return import("./chart");
// });
import Chart from "./chart";

const Stats = ({ async }) => (
  <Page>
    <BackButton to="/" />
    <Title>Statistics ({async ? "Concurrent" : "Normal"} mode)</Title>
    <Chart async={async} />
  </Page>
);

export default Stats;
