import { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "@components/Header";
import LoginContext from "@context/LoginContext";
import { tokens } from "@styles/theme";
import { TextField } from "@mui/material";
import { useState } from "react";
const fakeData = {
  "title": "hello"
}

const FastDash = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context, setContext } = useContext(LoginContext);
  const [inputValue, setInputValue] = useState("");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={colors.primary[500]}
      color={colors.grey[100]}
      textAlign="center"
      p={3}
    >
      <Header title={fakeData.title} />
      <Box mt={2}>
        <h1>Welcome to FastDash</h1>
        <h1>{inputValue}</h1>
        <p>Your one-stop dashboard for all your needs.</p>
      </Box>
      <Box mt={2}>
        <h2>Test Box</h2>
        <p>This is a test box added below the welcome message.</p>
      </Box>
      <Box mt={2} width="50%" height="150px">
        <TextField
          fullWidth
          label="Enter something"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default FastDash;
