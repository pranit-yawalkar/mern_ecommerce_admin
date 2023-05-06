import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Stack sx={{ height: "100vh" }}>
      <Box marginLeft="auto" padding={"1em"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          width={"40%"}
          padding={"2em"}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          gap={"2em"}
          borderRadius={"10px"}
          boxShadow={
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
          }
        >
          <Typography variant="h3" textAlign="center">
            ADMIN LOGIN
          </Typography>
          <TextField
            type="email"
            placeholder="Enter your email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Stack>
            <TextField
              type="password"
              placeholder="Enter your password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Link
              to="/forgot-password"
              style={{ marginLeft: "auto", marginTop: "10px" }}
            >
              Forgot Password?
            </Link>
          </Stack>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/admin")}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
