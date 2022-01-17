import React from "react";
import NonceView from "../../views/NonceView";
import PageTemplate from "../../templates/PageTemplate";
import StagedTransactionsView from "../../views/StagedTransactionsView";
import AddressesView from "../../views/AddressesView";

function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <NonceView />
      <AddressesView />
      <StagedTransactionsView />
    </PageTemplate>
  );
}

export default HomePage;
