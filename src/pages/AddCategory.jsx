import React, { useState } from "react";
import { Box, Button, Menu, TextField, MenuItem } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import Dropzone, { useDropzone } from "react-dropzone";
import DropZone from "../components/DropZone";
import { useDispatch } from "react-redux";
import { createProductCategory } from "../features/productCategory/productCategorySlice";

const categorySChema = yup.object().shape({
  title: yup.string().required("Required"),
});

const AddCategory = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: categorySChema,
    onSubmit: (values) => {
      dispatch(createProductCategory(values));
      formik.resetForm();
    },
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE PRODUCT CATEGORY"
        subtitle="Create a New Product Category"
      />

      <form onSubmit={formik.handleSubmit}>
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
            label="Product Category"
            onBlur={formik.handleBlur("title")}
            onChange={formik.handleChange("title")}
            value={formik.values.title}
            name="title"
            error={!!formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="80px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Category
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategory;
