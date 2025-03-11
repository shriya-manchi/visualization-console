import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "@styles/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GraphQLMenu from "@scenes/Global/GraphQLMenu";
import DataContext from "@context/DataContext";
import { GET_UNIQUE_VALUE_LIST } from "@graphql/Queries/Queries";

const TopBar = () => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { context, setContext } = useContext(DataContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST}
          queryFilter={context}
          minWidth={140}
          id="courseid"
          title="Course"
          fieldTitle="Course_Id"
          state={context}
          setState={setContext}
        />
        <GraphQLMenu
          query={GET_UNIQUE_VALUE_LIST}
          queryFilter={context}
          minWidth={180}
          id="sessionid"
          title="Exercise"
          fieldTitle="Session_Id"
          state={context}
          setState={setContext}
        />
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
