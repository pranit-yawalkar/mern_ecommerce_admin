import React, { useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customer/customerSlice";

const Customers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state?.customer?.customers);
  console.log(customers);
  const customerData = [];
  for (let i = 0; i < customers?.length; i++) {
    customerData.push({
      id: i + 1,
      firstName: customers[i]?.firstName,
      lastName: customers[i]?.lastName,
      email: customers[i]?.email,
      mobile: customers[i]?.mobile,
      role: customers[i]?.role,
    });
  }

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "firstName",
      headerName: "First Name",
      cellClassName: "firstName-column--cell",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      cellClassName: "lastName-column--cell",
      width: 200,
    },
    { field: "mobile", headerName: "Phone Number", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 100 },
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
        <Header title="Customers" subtitle="welcome to you Customers" />
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
          rows={customerData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Customers;
