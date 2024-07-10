import React, { useEffect, useState } from "react";
import { Row, Form, Col } from "react-bootstrap";
import Park from "./Park";
import Asset from "../../components/Asset";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";


import styles from "../../styles/Park.module.css";

function ParksPage({ message, filter = "" }) {
  const [parks, setParks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const { data } = await axiosReq.get(`/parks/?${filter}search=${query}`);
        setParks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchParks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);


  return (
    <Row>
      <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search parks"
          />
        </Form>



      {hasLoaded ? (
        parks.results.length ? (
          parks.results.map((park) => (
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