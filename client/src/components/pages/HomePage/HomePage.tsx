import React from "react";
import AddressContainer from "../../../containers/AddressContainer/AddressContainer";
import NextNonceContainer from "../../../containers/NextNonceContainer";
import StagedTransactionsRequestContainer from "../../../containers/StagedTransactionsRequestContainer";
import PageTemplate from "../../templates/PageTemplate";
function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <NextNonceContainer />
      <AddressContainer />
      <StagedTransactionsRequestContainer />
    </PageTemplate>
  );
}

export default HomePage;
