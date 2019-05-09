import React, { Suspense, lazy } from "react";

import Loader from "../design-system/loader";
import BackButton from "../design-system/back-button";
import Page from "../design-system/page";
import Title from "../design-system/title";

const Chart = lazy(() => import("./chart"));

const Stats = ({ async }) => (
  <Page>
    <BackButton to="/" />
    <Title>Statistics ({async ? "Concurrent" : "Normal"} mode)</Title>
    <Suspense fallback={<Loader />}>
      <Chart async={async} />
    </Suspense>
  </Page>
);

export default Stats;
