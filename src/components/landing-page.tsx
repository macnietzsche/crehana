import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ISelect } from "common/types/general";
import Select, { SingleValue, MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";

const COUNTRIES: ISelect[] = [
  { label: "hola1", value: "1" },
  { label: "hola2", value: "2" },
  { label: "hola3", value: "3" },
  { label: "hola4", value: "4" },
];
const CONTINENTS: ISelect[] = [
  { label: "hola1", value: "1" },
  { label: "hola2", value: "2" },
  { label: "hola3", value: "3" },
  { label: "hola4", value: "4" },
];
const CURRENCIES: ISelect[] = [
  { label: "hola1", value: "1" },
  { label: "hola2", value: "2" },
  { label: "hola3", value: "3" },
  { label: "hola4", value: "4" },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState<SingleValue<ISelect>>();
  const [continents, setContinents] = useState<MultiValue<ISelect>>();
  const [currencies, setCurrencies] = useState<MultiValue<ISelect>>();

  useEffect(() => {
    if (country) {
      const countryId: string = country.value;
      navigate(countryId);
    }
  }, [country]);

  useEffect(() => {
    const continentsId = continents?.map(
      (continent: SingleValue<ISelect>) => continent?.value
    );

    const currenciesId = currencies?.map(
      (currency: SingleValue<ISelect>) => currency?.value
    );
  }, [currencies, continents]);

  return (
    <React.Fragment>
      <Container fluid>
        <Container className="mt-3">
          <Row>
            <Col>
              <h4>Country:</h4>
              <Select
                onChange={(value: SingleValue<ISelect>) => setCountry(value)}
                options={COUNTRIES}
                placeholder="Choose a country"
              />
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
                onChange={(value: MultiValue<ISelect>) => setContinents(value)}
                options={CONTINENTS}
                placeholder="Choose continents"
              />
            </Col>
            <Col sm="12" md="6">
              <h6>Currency:</h6>
              <Select
                isMulti={true}
                onChange={(value: MultiValue<ISelect>) => setCurrencies(value)}
                options={CURRENCIES}
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
