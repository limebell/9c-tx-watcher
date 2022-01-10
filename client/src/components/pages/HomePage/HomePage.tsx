import React from "react";
import AddressContainer from "../../../containers/AddressContainer/AddressContainer";
import NextNonceContainer from "../../../containers/NextNonceContainer";
import StagedTransactionsRequestContainer from "../../../containers/StagedTransactionsRequestContainer";
import PageTemplate from "../../templates/PageTemplate";
function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <StagedTransactionsRequestContainer />
      <NextNonceContainer />
      <AddressContainer />
    </PageTemplate>
  );
}

export default HomePage;
