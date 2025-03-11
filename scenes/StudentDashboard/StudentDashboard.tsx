import { Box } from "@mui/material";
import Header from "@components/Header";
import GraphQLMenu from "@scenes/Global/GraphQLMenu";
import { GET_UNIQUE_VALUE_LIST } from "@graphql/Queries/Queries";
import { useContext, useState } from "react";
import DataContext from "@context/DataContext";
const StudentDashboard = () => {
  const { context } = useContext(DataContext);
  const [state, setState] = useState({ Student_Id: "All" });
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Student View" subtitle="View of All Students!" />
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST}
          queryFilter={context}
          minWidth={180}
          id="studentid"
          title="Student"
          fieldTitle="Student_Id"
          state={state}
          setState={setState}
        />
      </Box>
      {state.Student_Id === "All" ? (
        <h3>Select a Student</h3>
      ) : (
        <h3>{state.Student_Id}</h3>
      )}
    </Box>
  );
};

export default StudentDashboard;
