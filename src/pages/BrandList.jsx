import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../features/brand/brandSlice";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";

const BrandList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((state) => state?.brand?.brands);
  const updatedBrand = useSelector((state) => state?.brand?.updatedBrand);
  const deletedBrand = useSelector((state) => state?.brand?.deletedBrand);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [brandId, setBrandId] = useState("");

  const handleConfirmOpen = (id) => {
    setOpenConfirm(true);
    setBrandId(id);
  };

  const handleConfirm = () => {
    // Your custom confirmation logic here
    dispatch(deleteBrand(brandId));
    handleCancel();
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    dispatch(getBrands());
  }, [updatedBrand, deletedBrand]);

  const brandData = [];
  for (let i = 0; i < brands?.length; i++) {
    brandData.push({
      id: i + 1,
      brand: brands[i]?.title,
      _id: brands[i]._id,
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
            <IconButton
              onClick={() => navigate(`/admin/add-brand/${params.row._id}`)}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleConfirmOpen(params.row._id)}>
              <GridDeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
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
      <ConfirmDialog
        open={openConfirm}
        title="Confirm Dialog"
        message="Are you sure you want to perform this action?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default BrandList;
