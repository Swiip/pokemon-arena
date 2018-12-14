import React, { Suspense } from "react";
import styled from "styled-components";

import FormContent from "./form-content";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Form = ({ history }) => (
  <Container>
    <h1>Form</h1>
    <Suspense fallback={<div>Loading</div>}>
      <FormContent history={history} />
    </Suspense>
  </Container>
);
export default Form;
