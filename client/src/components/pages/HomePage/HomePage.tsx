import React from "react";
import AddressContainer from "../../../containers/AddressContainer";
import NextNonceContainer from "../../../containers/NextNonceContainer";
import StagedTransactionsRequestContainer from "../../../containers/StagedTransactionsRequestContainer";
import PageTemplate from "../../templates/PageTemplate";
import TestContainer from "../../../containers/TestContainer";

function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <StagedTransactionsRequestContainer />
    </PageTemplate>
  );
}

export default HomePage;
