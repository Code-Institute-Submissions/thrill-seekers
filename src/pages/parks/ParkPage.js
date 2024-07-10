import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Park from "./Park";
import styles from "../../styles/Park.module.css";

function ParkPage() {
  const { id } = useParams();
  const [park, setPark] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: parkData }] = await Promise.all([
          axiosReq.get(`/parks/${id}`),
        ]);
        setPark({ results: [parkData] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div className="mb-3">
      <Park {...park.results[0]} setParks={setPark} parkPage />
  </div>
  );
}

export default ParkPage;