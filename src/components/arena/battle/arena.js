import React, { Suspense } from "react";

import Loader from "../../design-system/loader";
import BackButton from "../../design-system/back-button";
import Title from "../../design-system/title";
import Page from "../../design-system/page";

import Battle from "./battle";

const Arena = ({ match }) => (
  <Page>
    <BackButton to="/arena/choice" />
    <Title>Arena</Title>
    <Suspense fallback={<Loader />}>
      <Battle match={match} />
    </Suspense>
  </Page>
);
export default Arena;
