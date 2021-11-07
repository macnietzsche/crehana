import React from "react";
import { Container } from "react-bootstrap";

const Fallback: React.FC = () => {
  return (
    <Container fluid>
      <Container>
        <span>Loading...</span>
      </Container>
    </Container>
  );
};

export default Fallback;
