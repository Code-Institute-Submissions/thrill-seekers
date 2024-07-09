import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Park from "./Park";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";

function ParksPage({ message, filter = "" }) {
  const [parks, setParks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const { data } = await axiosReq.get(`/parks/?${filter}`);
        setParks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchParks();
  }, [filter, pathname]);


  return (
    
      <Row>
        {hasLoaded ? (
          parks.results.length ? (
            parks.results.map((park, index) => (
              <Col key={park.id} xs={12} className="mb-3">
                <Park {...park} setParks={setParks} />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Asset src={NoResults} message={message} />
            </Col>
          )
        ) : (
          <Col xs={12}>
            <Asset spinner />
          </Col>
        )}
      </Row>
    
  );
}

export default ParksPage;