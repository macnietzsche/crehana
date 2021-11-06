import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { ISelect } from "common/types";
import Select, { SingleValue, MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";
import {
  useContinents,
  useCurrencies,
  useCountries,
} from "common/graphql/queries";
import { BsSearch } from "react-icons/bs";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState<SingleValue<ISelect>>();
  const [continentsFilter, setContinentsFilter] = useState<string[]>();
  const [currencyFilter, setCurrencyFilter] = useState<string>();

  const continents = useContinents();
  const currencies = useCurrencies();
  const countries = useCountries({
    currency: currencyFilter,
    continents: continentsFilter,
  });

  const handleDetails = () => {
    navigate(`${country?.value}`);
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Container className="mt-3">
          <Row>
            <Col sm="12">
              <h5>Country:</h5>
            </Col>
            <Col className="col-10">
              <Select
                onChange={(value: SingleValue<ISelect>) => setCountry(value)}
                options={countries}
                placeholder="Choose a country"
                value={country}
              />
            </Col>
            <Col className="col-2">
              <Button
                className="w-100 h-100 d-flex  align-items-center justify-content-center"
                onClick={handleDetails}
                disabled={!country?.value}
              >
                <span className="d-none d-md-flex">Details</span>
                <BsSearch className="d-md-none align-items-center" />
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12">
              <h5 className="text-center">Apply filters</h5>
            </Col>
            <Col sm="12" md="6">
              <h6>Continent:</h6>
              <Select
                isMulti={true}
                onChange={(value: MultiValue<ISelect>) => {
                  setContinentsFilter(value.map((item: ISelect) => item.value));
                  setCountry(null);
                }}
                options={continents}
                placeholder="Choose continents"
              />
            </Col>
            <Col sm="12" md="6">
              <h6>Currency:</h6>
              <Select
                onChange={(value: SingleValue<ISelect>) => {
                  setCurrencyFilter(value?.value);
                  setCountry(null);
                }}
                options={currencies}
                placeholder="Choose currencies"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default LandingPage;
