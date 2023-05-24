import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  TextField,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
  FilledInput,
  InputLabel,
  FormControl,
} from "@mui/material";
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
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/productCategory/productCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { createProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const productSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  quantity: yup.string().required("Quantity is required"),
  color: yup.array().required("Color is required"),
  tag: yup.array().required("Tag is required"),
});

const tags = ["featured", "special"];

const AddProduct = () => {
  //   const [desc, setDesc] = useState();
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { getRootProps, getInputProps } = useDropzone();
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      color: [],
      tag: [],
      images: [],
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      const colors = [];
      values?.color?.map((item) => {
        colors.push(item?._id);
      });
      values.color = colors;
      values.images = images;
      dispatch(createProduct(values));
      formik.resetForm();
      setSubmitted(true);
    },
  });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);

  const brands = useSelector((state) => state?.brand?.brands);
  const categories = useSelector((state) => state?.productCategory?.categories);
  const colorState = useSelector((state) => state?.color?.colors);
  const imageState = useSelector((state) => state?.upload?.images);

  useEffect(() => {
    const imageArr = [];
    imageState?.map((image) => {
      imageArr.push({ public_id: image?.public_id, url: image?.url });
    });
    setImages(imageArr);
  }, [imageState]);

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product" />

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
            label="Product Title"
            onBlur={formik.handleBlur("title")}
            onChange={formik.handleChange("title")}
            value={formik.values.title}
            name="title"
            error={!!formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            select
            label="Product Category"
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
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="number"
            label="Product Price"
            onBlur={formik.handleBlur("price")}
            onChange={formik.handleChange("price")}
            value={formik.values.price}
            name="price"
            error={!!formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="number"
            label="Product Quantity"
            onBlur={formik.handleBlur("quantity")}
            onChange={formik.handleChange("quantity")}
            value={formik.values.quantity}
            name="quantity"
            error={!!formik.touched.quantity && !!formik.errors.quantity}
            helperText={formik.touched.quantity && formik.errors.quantity}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Brand"
            variant="filled"
            color="secondary"
            onBlur={formik.handleBlur("brand")}
            onChange={formik.handleChange("brand")}
            value={formik.values.brand}
            name="brand"
            error={!!formik.touched.brand && !!formik.errors.brand}
            helperText={formik.touched.brand && formik.errors.brand}
            sx={{ gridColumn: "span 4" }}
          >
            {brands?.map((brand) => (
              <MenuItem key={brand?._id} value={brand?._id}>
                {brand?.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Tags"
            variant="filled"
            color="secondary"
            onBlur={formik.handleBlur("tag")}
            onChange={formik.handleChange("tag")}
            value={formik.values.tag}
            name="tag"
            error={!!formik.touched.tag && !!formik.errors.tag}
            helperText={formik.touched.tag && formik.errors.tag}
            sx={{ gridColumn: "span 4" }}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              ),
            }}
          >
            {tags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  color="secondary"
                  checked={formik.values.tag.includes(name)}
                />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Colors"
            variant="filled"
            color="secondary"
            onBlur={formik.handleBlur("color")}
            onChange={formik.handleChange("color")}
            value={formik.values.color}
            name="color"
            error={!!formik.touched.color && !!formik.errors.color}
            helperText={formik.touched.color && formik.errors.color}
            sx={{ gridColumn: "span 4" }}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((color) => (
                    <Chip key={color?._id} label={color?.title} />
                  ))}
                </Box>
              ),
            }}
          >
            {colorState?.map((color) => (
              <MenuItem key={color?._id} value={color}>
                <Checkbox
                  color="secondary"
                  checked={formik.values.color.includes(color)}
                />
                <ListItemText primary={color?.title} />
              </MenuItem>
            ))}
          </TextField>
          {/* <FormControl
            variant="filled"
            color="secondary"
            sx={{ gridColumn: "span 4" }}
          >
            <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={formik.values.tag}
              label="Tag"
              name="tag"
              onChange={formik.handleChange("tag")}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox
                    color="secondary"
                    checked={formik.values.tag.includes(name)}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          {/* <FormControl
            variant="filled"
            color="secondary"
            sx={{ gridColumn: "span 4" }}
          >
            <InputLabel id="demo-multiple-chip-label">Colors</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={formik.values.color}
              label="Tag"
              name="color"
              onChange={formik.handleChange("color")}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((color) => (
                    <Chip key={color?._id} label={color?.title} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {colorState?.map((color) => (
                <MenuItem key={color?._id} value={color}>
                  <Checkbox
                    color="secondary"
                    checked={formik.values.color.includes(color)}
                  />
                  <ListItemText primary={color?.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </Box>
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
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
