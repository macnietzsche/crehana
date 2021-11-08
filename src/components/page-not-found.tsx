import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <Container className="d-flex flex-column justify-content-center">
        <h2 className="mt-3 text-center" data-testid="page-not-found-label">Page Not Found</h2>
        <Link to="/" className="d-flex mt-4 btn btn-primary mx-auto" data-testid="home-button-anchor">
          <FaHome className="my-auto" />
          <span className="mx-2">Go Home</span>
        </Link>
      </Container>
    </Container>
  );
};

export default PageNotFound;
