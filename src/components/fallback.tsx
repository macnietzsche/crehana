import React from "react";
import { Container } from "react-bootstrap";

const Fallback: React.FC = () => {
  return (
    <Container fluid>
      <Container>
        <h4 data-testid="loading-label">Loading...</h4>
      </Container>
    </Container>
  );
};

export default Fallback;
