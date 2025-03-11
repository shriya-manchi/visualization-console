import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TextField, Autocomplete, Box, Typography } from "@mui/material";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { GET_METRIC_DATA, GET_VIZ_PROG_DATA } from "@graphql/Queries/Queries";
import { handleQueryFilter } from "@utility/utility";
import { format } from "date-fns";

const VizProgSearch = ({ queryFilter = {} }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentIds, setStudentIds] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(
    queryFilter.Timestamp
  );

  const metricVariables = handleQueryFilter(queryFilter);
  const { loading: loadingMetric, data: dataMetric } = useQuery(
    GET_METRIC_DATA,
    {
      variables: metricVariables,
      fetchPolicy: "no-cache",
    }
  );

  const vizProgVariables = {
    ...metricVariables,
    Student_Id: selectedStudent ? [selectedStudent] : [],
  };
  const { loading: loadingVizProg, data: dataVizProg } = useQuery(
    GET_VIZ_PROG_DATA,
    {
      variables: vizProgVariables,
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (dataMetric && dataMetric.GetMetricData) {
      const uniqueIds = new Set();
      dataMetric.GetMetricData.forEach((metric) => {
        metric.data.forEach((d) => {
          uniqueIds.add(d.Student_Id);
        });
      });
      setStudentIds(Array.from(uniqueIds));
    }
  }, [dataMetric]);

  const convertFormattedDateToUnix = (formattedDate) => {
    try {
      const date = new Date(formattedDate);
      return Math.floor(date.getTime());
    } catch (error) {
      console.error("Error converting date to Unix timestamp:", error);
      return null;
    }
  };

  useEffect(() => {
    if (queryFilter.Timestamp) {
      setSelectedTimestamp(convertFormattedDateToUnix(queryFilter.Timestamp));
    }
  }, [queryFilter.Timestamp]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleSearch = (event, newValue) => {
    setSelectedStudent(newValue);
  };

  const filterHistoryBeforeSelectedTimestamp = (studentHistory) => {
    console.log("Current Timestamp:", selectedTimestamp);
    const filtered = studentHistory
      .filter((item) => {
        console.log("Comparing", item.Timestamp, "to", selectedTimestamp);
        return (
          parseInt(item.Timestamp, 10) <= selectedTimestamp &&
          item.Student_Id === selectedStudent
        );
      })
      .sort((a, b) => a.Timestamp - b.Timestamp); // Assuming you want latest first
    console.log("Filtered History:", filtered);
    return filtered;
  };

  const convertAndFormatTimestamp = (unixTimestamp) => {
    try {
      const date = new Date(parseInt(unixTimestamp, 10));
      return date.toLocaleString(); // This will format the date and time according to the local settings
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid date";
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500, paddingRight: "5px" }}>
      <h2>Test History</h2>
      <Autocomplete
        disablePortal
        id="student-search"
        options={studentIds}
        value={selectedStudent}
        onInputChange={handleInputChange}
        onChange={handleSearch}
        getOptionLabel={(option) => option.toString()}
        renderInput={(params) => (
          <TextField {...params} label="Search Students" variant="outlined" />
        )}
      />
      <Box sx={{ mt: 2 }}>
        {selectedStudent && selectedTimestamp && (
          <div>
            <h3>History for {selectedStudent}</h3>
            {dataVizProg &&
              filterHistoryBeforeSelectedTimestamp(
                dataVizProg.GetVizProgData.flatMap((metric) => metric.data)
              ).map((item, index) => (
                <Box key={index} my={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Timestamp: {convertAndFormatTimestamp(item.Timestamp)}
                  </Typography>
                  <CodeBlock
                    text={item.Code}
                    language="python"
                    showLineNumbers={true}
                    wrapLines={true}
                    theme="atom-one-dark"
                  />
                </Box>
              ))}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default VizProgSearch;
