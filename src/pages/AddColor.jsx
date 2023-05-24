import React, { useState } from "react";
import { Box, Button, Menu, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import Dropzone, { useDropzone } from "react-dropzone";
import DropZone from "../components/DropZone";

const AddColor = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = () => {};

  const initialValues = {
    color: "",
  };
  const checkoutSchema = yup.object().shape({
    color: yup.string().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE COLOR" subtitle="Create a New Color" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                color="secondary"
                variant="filled"
                type="text"
                label="Color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="color"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="80px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Color
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddColor;
