import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "@emotion/react";
import { createBrand, editBrand, getBrand } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const brandSChema = yup.object().shape({
  title: yup.string().required("Required"),
});

const AddBrand = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { brandId } = params;
  const currentBrand = useSelector((state) => state?.brand?.currentBrand);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: currentBrand?.title || "",
    },
    validationSchema: brandSChema,
    onSubmit: (values) => {
      if (brandId) {
        dispatch(editBrand({ id: brandId, data: values }));
        navigate("/admin/brand-list");
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (brandId) {
      dispatch(getBrand(brandId));
    } else {
      formik.values.title = "";
    }
  }, [brandId]);

  return (
    <Box m="20px">
      <Header
        title={`${brandId ? "Edit" : "Create"} Brand`}
        subtitle={`${brandId ? "Edit Brand" : "Create a New Brand"}`}
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
            label="Brand Name"
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
            {brandId ? "Update" : "Create New"} Brand
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBrand;
