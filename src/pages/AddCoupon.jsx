import React, { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "@emotion/react";
import { createBrand } from "../features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../features/coupon/couponSlice";

const brandSChema = yup.object().shape({
  name: yup.string().required("Required"),
  expiry: yup.date().required("Required"),
  discount: yup.number().required("Required").min(0).max(100),
});

const AddCoupon = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: brandSChema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      formik.resetForm();
    },
  });

  return (
    <Box m="20px">
      <Header title="CREATE COUPON" subtitle="Create a New Coupon" />

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
            label="Coupon Name"
            onBlur={formik.handleBlur("name")}
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            name="name"
            error={!!formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="number"
            label="Discount"
            onBlur={formik.handleBlur("discount")}
            onChange={formik.handleChange("discount")}
            value={formik.values.discount}
            name="discount"
            error={!!formik.touched.discount && !!formik.errors.discount}
            helperText={formik.touched.discount && formik.errors.discount}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="date"
            label="Expiry Date"
            onBlur={formik.handleBlur("expiry")}
            onChange={formik.handleChange("expiry")}
            value={formik.values.expiry}
            name="expiry"
            error={!!formik.touched.expiry && !!formik.errors.expiry}
            helperText={formik.touched.expiry && formik.errors.expiry}
            sx={{ gridColumn: "span 4", colorScheme: theme.palette.mode }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ min: currentDate }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="80px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Coupon
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCoupon;
