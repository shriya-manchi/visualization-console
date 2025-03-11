import { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@components/Header";
import GraphQLScatter from "@components/Graphs/GraphQLScatter";
import DataContext from "@context/DataContext";
import { GET_EVENT_DATA } from "@graphql/Queries/Queries";
import { tokens } from "@styles/theme";

const ExerciseDash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context } = useContext(DataContext);

  return (
    <Box m="20px">
      <Header
        title="Exercise Journey"
        subtitle="Student Progress Through Milestones"
      />

      <Box height="75vh" bgcolor={colors.primary[400]}>
        {context.Course_Id === "All" || context.Session_Id === "All" ? (
          <h2>Select a Course and Exercise</h2>
        ) : (
          <GraphQLScatter query={GET_EVENT_DATA} queryFilter={context} />
        )}
      </Box>
    </Box>
  );
};

export default ExerciseDash;
