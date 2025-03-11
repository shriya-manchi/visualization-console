import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Brick from "@scenes/BrickDashboard/Brick";
import { useQuery } from "@apollo/client";
import { handleQueryFilter } from "@utility/utility";

const Bricks = ({ query, queryFilter = {}, statusFilter }) => {
  const [brickData, setBrickData] = useState();

  const variable = handleQueryFilter(queryFilter, {});
  const { loading, error, data, startPolling } = useQuery(query, {
    variables: variable,
    fetchPolicy: "no-cache",
  });

  startPolling(5000);

  useEffect(() => {
    if (data !== undefined) {
      // Filter the bricks where the Correct field is true
      if (statusFilter === 1) {
        setBrickData(
          data.GetBrickData.filter(
            (student) => student.data[0].Correct === true
          )
        );
      } else if (statusFilter === 2) {
        // Filter the bricks where the Correct field is false
        setBrickData(
          data.GetBrickData.filter(
            (student) => student.data[0].Correct === false
          )
        );
      } else {
        setBrickData(data.GetBrickData);
      }
    }
  }, [data, statusFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      {brickData !== undefined &&
        brickData.map((student) => (
          <Brick key={student.data[0].Student_Id} student={student.data[0]} />
        ))}
    </Box>
  );
};

export default Bricks;
