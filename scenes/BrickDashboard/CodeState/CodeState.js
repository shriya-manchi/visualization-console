import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CodeBlock } from "react-code-blocks";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";

const CodeState = ({ currentSelectedStudent, query, queryFilter = {} }) => {
  const variable = handleQueryFilter(queryFilter, {});
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  startPolling(5000);

  const [selectedStudentCodes, setSelectedStudentCodes] = useState([]);

  useEffect(() => {
    if (data && currentSelectedStudent) {
      const filteredData = data.GetBrickTestData.filter(student =>
        student.data[0].Student_Name === currentSelectedStudent.Student_Name && student.data[0].Test === true
      );
      if (filteredData.length > 0) {
        console.log("Filtered Data:", filteredData);
        // Store the entire test result objects
        const studentCodes = filteredData.map(student => ({
          Code: student.data[0].Code,
          Timestamp: convertAndFormatTimestamp(student.data[0].Timestamp),
          Course_Id: student.data[0].Course_Id,
          Student_Id: student.data[0].Student_Id,
          Question_Id: student.data[0].Question_Id,
          Student_Name: student.data[0].Student_Name
        })).sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
        setSelectedStudentCodes(studentCodes);
      } else {
        setSelectedStudentCodes([]);
      }
    }
  }, [data, currentSelectedStudent]);

  const convertAndFormatTimestamp = (unixTimestamp) => {
    try {
        const date = new Date(parseInt(unixTimestamp, 10));
        return date.toLocaleString(); // This will format the date and time according to the local settings
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return 'Invalid date';
    }
};
  return (
    <Box>
      {currentSelectedStudent ? (
        <>
          <h3>Selected Student: {currentSelectedStudent.Student_Name}</h3>
          {selectedStudentCodes.length > 0 ? selectedStudentCodes.map((result, index) => (
            <div key={index} className="code-block">
              <p>Timestamp: {result.Timestamp}</p>
              <p>Question ID: {result.Question_Id}</p>
              <CodeBlock
                text={result.Code || "No code available"}
                language="python"
                showLineNumbers={true}
                wrapLines={true}
                theme="atom-one-dark"
              />
            </div>
          )) : <p>No code available for the selected tests.</p>}
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          Please select a student in the matrix
        </h3>
      )}
    </Box>
  );
};

export default CodeState;