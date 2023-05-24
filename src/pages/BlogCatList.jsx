import React, { useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";

import Header from "../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";

const BlogCatList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const blogCategories = useSelector(
    (state) => state?.blogCategory?.blogCategories
  );

  const blogCategoryData = [];
  for (let i = 0; i < blogCategories?.length; i++) {
    blogCategoryData.push({
      id: i + 1,
      title: blogCategories[i]?.title,
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
  );
};

export default BlogCatList;
