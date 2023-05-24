import React, { useEffect } from "react";
import { Box, Icon, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const products = useSelector((state) => state?.product?.products);
  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productData = [];
  for (let i = 0; i < products?.length; i++) {
    productData.push({
      id: i + 1,
      title: products[i]?.title,
      description: products[i]?.description,
      brand: products[i]?.brand?.title,
      quantity: products[i]?.quantity,
      price: products[i]?.price,
      totalRating: products[i]?.totalRating,
      tags: products[i]?.tag.join(", "),
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "totalRating", headerName: "Total Ratings", width: 100 },
    { field: "tags", headerName: "Tags", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Box p="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Products" subtitle="welcome to you Product List" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={productData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Products;
