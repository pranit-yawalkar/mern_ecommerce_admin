import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";

import Header from "../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  getProductCategories,
} from "../features/productCategory/productCategorySlice";
import ConfirmDialog from "../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state?.productCategory?.categories);
  const deletedCategory = useSelector(
    (state) => state?.productCategory?.deletedCategory
  );
  const updatedCategory = useSelector(
    (state) => state?.productCategory?.updatedCategory
  );

  const [openConfirm, setOpenConfirm] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const handleConfirmOpen = (id) => {
    setOpenConfirm(true);
    setCategoryId(id);
  };

  const handleConfirm = () => {
    // Your custom confirmation logic here
    dispatch(deleteProductCategory(categoryId));
    handleCancel();
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [updatedCategory, deletedCategory]);

  const categoryData = [];
  for (let i = 0; i < categories?.length; i++) {
    categoryData.push({
      id: i + 1,
      title: categories[i]?.title,
      _id: categories[i]._id,
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "title", headerName: "Title", width: 500 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => navigate(`/admin/add-category/${params.row._id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleConfirmOpen(params.row._id)}>
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <>
      <Box p="10px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="CategoryList"
            subtitle="welcome to you Category List"
          />
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
            rows={categoryData}
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

export default CategoryList;
