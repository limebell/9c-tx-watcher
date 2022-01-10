import React from "react";
import NextNonceContainer from "../../../containers/NextNonceContainer";
import StagedTransactionsRequestContainer from "../../../containers/StagedTransactionsRequestContainer";
import PageTemplate from "../../templates/PageTemplate";
function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <StagedTransactionsRequestContainer />
      <NextNonceContainer />
    </PageTemplate>
  );
}

export default HomePage;
