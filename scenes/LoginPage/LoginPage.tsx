import { useContext } from "react";
import { Box, useTheme, TextField, Button } from "@mui/material";
import Header from "@components/Header";
import GraphQLScatter from "@components/Graphs/GraphQLScatter";
import LoginContext from "@context/LoginContext";
import { GET_EVENT_DATA } from "@graphql/Queries/Queries";
import { tokens } from "@styles/theme";
import { useState } from "react";
import checkPassword from "@utility/login";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { context, setContext } = useContext(LoginContext);;

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const handleLogin = () => {
    checkPassword(usernameInput,passwordInput).then((isValid) => {
      if(isValid) {
        setContext({ username: usernameInput, isLoggedIn: true });
      }
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor={colors.primary[400]}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        bgcolor={colors.primary[200]}
        borderRadius={2}
        boxShadow={3}
      >
        <Header title="Login" subtitle="Please enter your credentials" />
        <Box component="form" mt={2} width="100%">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            onChange={handleUsernameChange}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handlePasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
