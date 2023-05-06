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
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

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
          boxShadow={
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
          }
          borderRadius={"10px"}
        >
          <Typography variant="h3" textAlign="center">
            Reset Password
          </Typography>
          <TextField
            type="email"
            placeholder="Enter your email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Box margin="auto" display="flex" gap="10px">
            <Button
              sx={{
                borderColor: colors.grey[100],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="contained"
              onClick={() => navigate("/admin")}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default ResetPassword;
