import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import TestContainer from "../../../containers/TestContainer";

function TestPage(): JSX.Element {
  return (
    <PageTemplate>
      <TestContainer />
    </PageTemplate>
  );
}

export default TestPage;
