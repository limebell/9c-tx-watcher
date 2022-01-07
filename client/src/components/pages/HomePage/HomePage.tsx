import React from "react";
import ApiRequestContainer from "../../../containers/ApiRequestContainer";
import PageTemplate from "../../templates/PageTemplate";

function HomePage(): JSX.Element {
  return (
    <PageTemplate>
      <ApiRequestContainer />
    </PageTemplate>
  );
}

export default HomePage;
