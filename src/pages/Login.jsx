import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (authState?.user !== null && !authState?.isError) {
      navigate("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      console.log(values);
    },
  });

  return (
    <Stack sx={{ height: "100vh", backgroundColor: colors.primary[400] }}>
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="email"
              placeholder="Enter your email"
              label="Email"
              variant="outlined"
              color="secondary"
              fullWidth
              margin="normal"
              name="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
              error={!!formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Stack>
              <TextField
                type="password"
                placeholder="Enter your password"
                label="Password"
                variant="outlined"
                color="secondary"
                fullWidth
                margin="normal"
                name="password"
                autoComplete="password"
                onChange={formik.handleChange("password")}
                value={formik.values.password}
                error={!!formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Link
                to="/forgot-password"
                color="primary"
                style={{ marginLeft: "auto", marginTop: "10px" }}
              >
                Forgot Password?
              </Link>
            </Stack>
            <Button
              type="submit"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
