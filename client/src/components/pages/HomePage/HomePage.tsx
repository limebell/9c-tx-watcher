import React from "react";
import NonceView from "../../views/NonceView";
import PageTemplate from "../../templates/PageTemplate";
import StagedTransactionsView from "../../views/StagedTransactionsView";
import AddressesView from "../../views/AddressesView";
import DiscardedTransactionsView from "../../views/DiscardedTransactionsView";

function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <h1>9c Transaction Monitor</h1>
      <NonceView />
      <AddressesView />
      <StagedTransactionsView />
      <DiscardedTransactionsView />
    </PageTemplate>
  );
}

export default HomePage;
