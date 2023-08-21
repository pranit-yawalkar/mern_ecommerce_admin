import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";

import Header from "../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCategory,
  getBlogCategories,
} from "../features/blogCategory/blogCategorySlice";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";

const BlogCatList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const updatedBlogCat = useSelector(
    (state) => state?.blogCategory?.updatedBlogCat
  );
  const deletedBlogCat = useSelector(
    (state) => state?.blogCategory?.deletedBlogCat
  );

  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [updatedBlogCat, deletedBlogCat]);

  const handleConfirmOpen = (id) => {
    setOpenConfirm(true);
    setBlogCatId(id);
  };

  const handleConfirm = () => {
    // Your custom confirmation logic here
    dispatch(deleteBlogCategory(blogCatId));
    handleCancel();
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  const blogCategories = useSelector(
    (state) => state?.blogCategory?.blogCategories
  );

  const blogCategoryData = [];
  for (let i = 0; i < blogCategories?.length; i++) {
    blogCategoryData.push({
      id: i + 1,
      title: blogCategories[i]?.title,
      _id: blogCategories[i]?._id,
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 200 },
    {
      field: "title",
      headerName: "Category Name",
      cellClassName: "name-column--cell",
      width: 500,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => navigate(`/admin/add-blog-category`)}>
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
            title="Blog Categories"
            subtitle="welcome to you Blog Categories"
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
            rows={blogCategoryData}
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

export default BlogCatList;
