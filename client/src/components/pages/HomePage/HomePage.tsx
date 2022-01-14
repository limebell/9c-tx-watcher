import React from "react";
import NonceView from "../../organisms/NonceView";
import PageTemplate from "../../templates/PageTemplate";
import StagedTransactionsView from "../../organisms/StagedTransactionsView";
import AddressesView from "../../organisms/AddressesView";

function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <StagedTransactionsRequestContainer />
    </PageTemplate>
  );
}

export default HomePage;
