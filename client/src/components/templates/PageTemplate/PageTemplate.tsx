import React from "react";

interface PageTemplateProps {
  children: React.ReactNode;
}

function PageTemplate(props: PageTemplateProps): JSX.Element {
  return <div className="page">{props.children}</div>;
}

export default PageTemplate;
