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

const AddBlog = () => {
  const [desc, setDesc] = useState();
  const { getRootProps, getInputProps } = useDropzone();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    title: "",
    category: "",
    desc: "",
  };
  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    category: yup.string().required("Required"),
    desc: yup.string().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE BLOG" subtitle="Create a New Blog" />

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
              <div style={{ gridColumn: "span 4" }}>
                <DropZone />
              </div>
              <TextField
                fullWidth
                color="secondary"
                variant="filled"
                type="text"
                label="Blog Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Blog Category"
                variant="filled"
                color="secondary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="Test">Test</MenuItem>
                <MenuItem value="Test">Test</MenuItem>
              </TextField>
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={setDesc}
                style={{
                  gridColumn: "span 4",
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="80px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddBlog;
