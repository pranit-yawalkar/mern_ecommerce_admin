import React, { useEffect } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons } from "../features/coupon/couponSlice";

const CouponList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state?.coupon?.coupons);

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const couponData = [];
  for (let i = 0; i < coupons?.length; i++) {
    couponData.push({
      id: i + 1,
      coupon: coupons[i]?.name,
      discount: coupons[i]?.discount,
      expiry: new Date(coupons[i]?.expiry).toLocaleDateString(),
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "coupon", headerName: "Coupon Name", width: 200 },
    { field: "discount", headerName: "Discount", width: 200 },
    { field: "expiry", headerName: "Expiry", width: 200 },
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
        <Header title="Coupons" subtitle="welcome to you Coupon List" />
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
          rows={couponData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CouponList;
