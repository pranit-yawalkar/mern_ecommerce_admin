import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  createProductCategory,
  getProductCategory,
  updateProductCategory,
} from "../features/productCategory/productCategorySlice";
import { useNavigate, useParams } from "react-router-dom";

const categorySChema = yup.object().shape({
  title: yup.string().required("Required"),
});

const AddCategory = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { categoryId } = params;
  const category = useSelector((state) => state?.productCategory?.category);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title || "",
    },
    validationSchema: categorySChema,
    onSubmit: (values) => {
      if (categoryId) {
        dispatch(updateProductCategory({ id: categoryId, data: values }));
        navigate("/admin/category-list");
      } else {
        dispatch(createProductCategory(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductCategory(categoryId));
    } else {
      formik.values.title = "";
    }
  }, [categoryId]);

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
            {categoryId ? "Update" : "Create New"} Category
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategory;
