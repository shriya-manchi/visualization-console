import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
  Box
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";

const StudentsAttemptsTable = ({ query, queryFilter = {}, onCodeButtonClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [brickData, setBrickData] = useState([]);

  const sortData = useCallback(
    (data) => {
      return [...data].sort((a, b) => {
        let valueA = a.data[0][sortConfig.key];
        let valueB = b.data[0][sortConfig.key];

        // Case-insensitive comparison for strings
        if (typeof valueA === "string") {
          valueA = valueA.toLowerCase();
        }
        if (typeof valueB === "string") {
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    },
    [sortConfig]
  );

  const handleSort = useCallback(
    (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  // Function to convert ISO timestamp to local time string
  const convertToLocalTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    return date.toLocaleString();
  };

  const variable = handleQueryFilter(queryFilter, {});
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  startPolling(5000);

  // Apply sorting when data or sortConfig changes
  useEffect(() => {
    if (data && data.GetBrickData) {
      const sortedData = sortData([...data.GetBrickData]);
      setBrickData(sortedData);
    }
  }, [data, sortConfig, sortData]);

  return (
      <TableContainer component={Paper} className="customTableContainer" style={{ maxHeight: '485px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "name"}
                  direction={
                    sortConfig.key === "name" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "functionality"}
                  direction={
                    sortConfig.key === "functionality"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("functionality")}
                >
                  Functionality
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "Progress"}
                  direction={
                    sortConfig.key === "Progress" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("Progress")}
                >
                  Last Checkpoint
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Code
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brickData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.data[0].Student_Name}</TableCell>
                <TableCell>
                  {row.data[0].Correct === true ? "✅" : "❌"}
                </TableCell>
                <TableCell>
                  {convertToLocalTime(row.data[0].Last_Submission)}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => onCodeButtonClick(row.data[0])}
                  >
                    Code
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default StudentsAttemptsTable;
