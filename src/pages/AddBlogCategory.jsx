import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { createBrand } from "../features/brand/brandSlice";
import { createBlogCategory } from "../features/blogCategory/blogCategorySlice";

const blogCategorydSChema = yup.object().shape({
  title: yup.string().required("Required"),
});

const AddBlogCategory = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: blogCategorydSChema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();
    },
  });

  return (
    <Box m="20px">
      <Header
        title="CREATE BLOG CATEGORY"
        subtitle="Create a New Blog Category"
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
            label="Blog Category"
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
            Create New Blog Category
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBlogCategory;
