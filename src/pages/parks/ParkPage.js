import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Park from "./Park";

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
    <Park {...park.results[0]} setParks={setPark} parkPage />
  );
}

export default ParkPage;