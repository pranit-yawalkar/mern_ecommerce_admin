import React, { useEffect } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";

const BrandList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.brand?.brands);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandData = [];
  for (let i = 0; i < brands?.length; i++) {
    brandData.push({
      id: i + 1,
      brand: brands[i]?.title,
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "brand", headerName: "Brand", width: 500 },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <GridDeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box p="10px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Brands" subtitle="welcome to you Brand List" />
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
          rows={brandData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default BrandList;
