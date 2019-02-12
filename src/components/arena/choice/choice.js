import React, { Suspense } from "react";

import Page from "../../design-system/page";
import Loader from "../../design-system/loader";
import BackButton from "../../design-system/back-button";
import Title from "../../design-system/title";
// import ErrorHandler from "../../design-system/errors";

import Form from "./form";

const Choice = ({ history }) => (
  <Page>
    <BackButton to="/" />
    <Title>Choose your pokemons</Title>
    <Suspense fallback={<Loader />}>
      <Form history={history} />
    </Suspense>
  </Page>
);

export default Choice;
