import React from "react";
import StagedTransactionsRequestContainer from "../../../containers/StagedTransactionsRequestContainer";
import PageTemplate from "../../templates/PageTemplate";
function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <StagedTransactionsRequestContainer />
    </PageTemplate>
  );
}

export default HomePage;
