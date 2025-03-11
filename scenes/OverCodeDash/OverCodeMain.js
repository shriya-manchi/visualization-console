import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";
import OverCodeDashDataProcessor from "@scenes/OverCodeDash/OverCodeDashDataProcessor";
import OverCodeDashHeader from "@scenes/OverCodeDash/OverCodeDashHeader";

const OverCodeMain = ({ query, queryFilter = {} }) => {
  const [overCodeData, setOverCodeData] = useState(null);
  const [rawData, setRawData] = useState(null);

  const variable = handleQueryFilter(queryFilter, {});
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  const processData = () => {
    if (!loading && !error && rawData) {
      const processor = OverCodeDashDataProcessor(rawData);
      setOverCodeData(processor);
    }
  };

  useEffect(() => {
    processData();
  }, [rawData]);

  useEffect(() => {
    if (!loading && !error && data) {
      setRawData(data);
    }
  }, [data]);

  return (
    <div>
      {overCodeData && <OverCodeDashHeader overCodeData={overCodeData} />}
    </div>
  );
};

export default OverCodeMain;
