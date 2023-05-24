import React, { useEffect } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridDeleteIcon } from "@mui/x-data-grid";
import { tokens } from "../theme";

import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import EditIcon from "@mui/icons-material/Edit";

const BlogList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogs = useSelector((state) => state?.blog?.blogs);
  const blogData = [];
  for (let i = 0; i < blogs?.length; i++) {
    blogData.push({
      id: i + 1,
      title: blogs[i]?.title,
      description: blogs[i]?.description,
      author: blogs[i]?.author,
      numViews: blogs[i]?.numViews,
      likes: blogs[i]?.likes?.length,
      dislikes: blogs[i]?.dislikes?.length,
    });
  }

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "author", headerName: "Author", width: 100 },
    { field: "numViews", headerName: "No of Views", width: 100 },
    { field: "likes", headerName: "Likes", width: 100 },
    { field: "dislikes", headerName: "Dislikes", width: 100 },
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
        <Header title="Blogs" subtitle="welcome to you Blogs" />
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
          rows={blogData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default BlogList;
