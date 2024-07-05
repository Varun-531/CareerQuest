import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch-internship/${id}`)
      .then((res) => {
        setInternship(res.data);
        setLoading(false);
        console.log("Fetched internship:", res.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <div>Error fetching internship: {error.message}</div>;
  }

  if (!internship) {
    return <div>No internship found</div>;
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-opacity-60 bg-slate-200 flex justify-center items-center z-50">
          <HashLoader
            color="#3f3737"
            speedMultiplier={1}
            loading={loading}
            size={30}
          />
        </div>
      )}
      <div>
        <h1>{internship.title}</h1>
      </div>
    </>
  );
};

export default InternshipDetails;
