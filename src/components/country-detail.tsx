import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useCountry } from "common/graphql/queries";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CountryDetail: React.FC = () => {
  const { id } = useParams();
  const { data, loading } = useCountry(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !data?.country) {
      navigate("/page-not-found");
    }
  }, [data, loading, navigate]);

  return (
    <Container fluid>
      <Container className="d-flex flex-column">
        <div className=" mt-3 d-flex justify-content-between">
          <h2 className="my-auto">{data?.country?.name}</h2>
          <img
            src={`https://flagcdn.com/256x192/${id?.toLowerCase()}.png`}
            alt={`flag-${id}`}
            width="48"
            height="36"
          />
        </div>
        <hr />
        <Table responsive className="mx-auto">
          <tbody>
            <tr>
              <td className="fw-bold text-start">Code</td>
              <td className="text-end">{data?.country?.code}</td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Name</td>
              <td className="text-end">{data?.country?.name}</td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Currency</td>
              <td className="text-end">{data?.country?.currency}</td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Continent</td>
              <td className="text-end">{data?.country?.continent?.name}</td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Languages</td>
              <td className="text-end">
                {data?.country?.languages
                  .map((language) => language.name)
                  .join(", ")}
              </td>
            </tr>
            <tr>
              <td className="fw-bold text-start">Capital</td>
              <td className="text-end">{data?.country?.capital}</td>
            </tr>
          </tbody>
        </Table>

        <Link to="/" className="d-flex mt-4 btn btn-primary mx-auto">
          <FiArrowLeft className="my-auto" />
          <span className="mx-2">Search other countries</span>
        </Link>
      </Container>
    </Container>
  );
};

export default CountryDetail;
