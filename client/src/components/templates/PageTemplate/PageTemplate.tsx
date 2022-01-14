import React from "react";
import { Container } from "react-bootstrap";

interface PageTemplateProps {
  children: React.ReactNode;
}

function PageTemplate(props: PageTemplateProps): JSX.Element {
  return (
    <div className="page">
      <Container>{props.children}</Container>
    </div>
  );
}

export default PageTemplate;
