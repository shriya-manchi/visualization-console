import { Box, useTheme } from "@mui/material";
import Header from "@components/Header";
import { tokens } from "@styles/theme";
import GraphQLStatBox from "@components/GraphQLStatBox";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import GraphQLSummarySeries from "@components/Graphs/GraphQLSummarySeries";

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Overview"
          subtitle="High Level Overview of Courses and Assignments"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GraphQLStatBox
            subtitle="Courses"
            column="Course_Id"
            icon={
              <LibraryBooksOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GraphQLStatBox
            subtitle="Exercises"
            column="Session_Id"
            icon={
              <FitnessCenterOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GraphQLStatBox
            subtitle="Students"
            column="Student_Id"
            icon={
              <Groups2OutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <GraphQLStatBox
            column="Event_Id"
            subtitle="Events"
            icon={
              <ListOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Row 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          bgcolor={colors.primary[400]}
        >
          <GraphQLSummarySeries />
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
