import React, { useEffect, useState, lazy, Suspense } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/ParksPage.module.css";

const LazyPark = lazy(() => import("./Park"));

function ParksPage({ message, filter = "" }) {
  const [parks, setParks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const { data } = await axiosReq.get(`/parks/?${filter}search=${query}&ordering=${ordering}`);
        setParks(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchParks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, ordering]);

  return (
    <Container className={styles.ParkContainer}>
      <Row>
        <Col xs={12} className={styles.SearchBarContainer}>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Label htmlFor="search" className={styles.LabelSearchBar}>
              Search parks
            </Form.Label>
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form.Control
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search parks"
            />
          </Form>
          <div className={styles.OrderingSelectContainer}>
            <i className={`fas fa-filter ${styles.FilterIcon}`}></i>
            <Form.Control
              id="orderingSelect"
              as="select"
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className={styles.OrderingSelect}
            >
              <option value="">Sort by</option>
              <option value="-bucketlist_count">Most Bucketlisted</option>
              <option value="-ratings_count">Most Rated</option>
              <option value="-thrill_factor">Highest Thrill Factor</option>
              <option value="-overall_rating">Highest Overall Rating</option>
            </Form.Control>
            <i className={`fas fa-chevron-down ${styles.DropdownArrow}`}></i>
          </div>
        </Col>

        {hasLoaded ? (
          parks.results.length ? (
            <InfiniteScroll
              dataLength={parks.results.length}
              next={() => fetchMoreData(parks, setParks)}
              hasMore={!!parks.next}
              loader={<Asset spinner />}
            >
              <Suspense fallback={<Asset spinner />}>
                {parks.results.map((park) => (
                  <Col key={park.id} xs={12} className="mb-3">
                    <LazyPark {...park} setParks={setParks} isParksPage={true} />
                  </Col>
                ))}
              </Suspense>
            </InfiniteScroll>
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
    </Container>
  );
}

export default ParksPage;
