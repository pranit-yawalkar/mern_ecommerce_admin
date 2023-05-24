import React, { useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders = useSelector((state) => state?.order?.orders);
  console.log(orders);
  const orderData = [];
  for (let i = 0; i < orders?.length; i++) {
    orderData.push({
      id: i + 1,
      name: orders[i]?.user?.firstName + " " + orders[i]?.user?.lastName,
      products:
        orders[i]?.orderItems?.length > 1
          ? orders[i]?.orderItems?.reduce(
              (prev, curr) =>
                prev?.product?.title +
                " " +
                `(${prev?.quantity})` +
                ", " +
                curr?.product?.title +
                " " +
                `(${prev?.quantity})`
            )
          : orders[i]?.orderItems[0]?.product?.title +
            " " +
            `(${orders[i]?.orderItems[0]?.quantity})`,
      address: JSON.stringify(orders[i]?.shippingInfo),
      totalPrice: orders[i]?.totalPrice,
      orderDate: new Date(orders[i]?.paidAt).toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 50 },
    {
      field: "name",
      headerName: "Customer Name",
      cellClassName: "name-column--cell",
      width: 150,
    },
    { field: "products", headerName: "Products", width: 250 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "orderDate", headerName: "Ordered on", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <>
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
        <Header title="Orders" subtitle="welcome to you Orders" />
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
            wordWrap: "break-word",
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
          rows={orderData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
