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
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../features/blog/blogSlice";

const AddBlog = () => {
  const [desc, setDesc] = useState();
  const { getRootProps, getInputProps } = useDropzone();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const categories = useSelector(
    (state) => state?.blogCategory?.blogCategories
  );
  const imageState = useSelector((state) => state?.upload?.images);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    dispatch(getBlogCategories());
    const imageArr = [];
    imageState?.map((image) => {
      imageArr.push({ public_id: image?.public_id, url: image?.url });
    });
    setImages(imageArr);
  }, []);

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Required"),
    category: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      images: [],
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      values.images = images;
      dispatch(addBlog(values));
      formik.resetForm();
      setSubmitted(true);
    },
  });

  return (
    <Box m="20px">
      <Header title="CREATE BLOG" subtitle="Create a New Blog" />

      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <DropZone isSubmit={submitted} />
          </div>
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="text"
            label="Blog Title"
            onBlur={formik.handleBlur("title")}
            onChange={formik.handleChange("title")}
            value={formik.values.title}
            name="title"
            error={!!formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Blog Category"
            variant="filled"
            color="secondary"
            onBlur={formik.handleBlur("category")}
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            name="category"
            error={!!formik.touched.category && !!formik.errors.category}
            helperText={formik.touched.category && formik.errors.category}
            sx={{ gridColumn: "span 4" }}
          >
            {categories?.map((category) => (
              <MenuItem key={category?._id} value={category?._id}>
                {category?.title}
              </MenuItem>
            ))}
          </TextField>
          <ReactQuill
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            style={{
              gridColumn: "span 4",
              marginTop: "2.5em",
            }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="80px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Blog
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBlog;
