// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { useTheme, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import TocIcon from "@mui/icons-material/Toc";
import CategoryIcon from "@mui/icons-material/Category";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import PaletteIcon from "@mui/icons-material/Palette";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { useSidebarContext } from "./SidebarContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const useStyles = makeStyles((theme) => ({
    menuItem: {
      "&:hover": {
        color: colors.blueAccent[500],
      },
    },
  }));

  const classes = useStyles();

  return (
    <MenuItem
      active={selected === title}
      style={
        selected === title
          ? {
              backgroundColor: colors.greenAccent[400],
              color: colors.blueAccent[900],
            }
          : {}
      }
      className={classes.menuItem}
      onClick={() => {
        setSelected(title);
        navigate(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidenav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.grey[500]} !important`,
          backgroundColor: `${colors.grey[500]} !important`,
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              <MenuOutlinedIcon
                onClick={
                  broken ? () => toggleSidebar() : () => collapseSidebar()
                }
              />
              // ) : (
              //   <IconButton

              //   >
              //     <CloseOutlinedIcon />
              //   </IconButton>
              // )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              background: "none",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                margin="0"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  ShoppingSpot
                </Typography>
              </Box>
            )}
          </MenuItem>
          {/* {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={"../../assets/user.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Harun Jeylan
                </Typography>
              </Box>
            </Box>
          )} */}
          <Box>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={!collapsed ? { ml: "20px" } : { textAlign: "center" }}
            >
              Data
            </Typography>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Customers"
              to="/admin/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/admin/orders"
              icon={<ReceiptLongIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/admin/messages"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={!collapsed ? { ml: "20px" } : { textAlign: "center" }}
            >
              Catalog
            </Typography>
            <Item
              title="Add Product"
              to="/admin/add-product"
              icon={<AddBusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Product List"
              to="/admin/product-list"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Brand"
              to="/admin/add-brand"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Brand List"
              to="/admin/brand-list"
              icon={<BrandingWatermarkIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Category"
              to="/admin/add-category"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Category List"
              to="/admin/category-list"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Color"
              to="/admin/add-color"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Color List"
              to="/admin/color-list"
              icon={<PaletteIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={!collapsed ? { ml: "20px" } : { textAlign: "center" }}
            >
              Blogs
            </Typography>
            <Item
              title="Add Blog"
              to="/admin/add-blog"
              icon={<PostAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Blog List"
              to="/admin/blog-list"
              icon={<LibraryBooksIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Blog Category"
              to="/admin/add-blog-category"
              icon={<PlaylistAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Blog Category List"
              to="/admin/blog-cat-list"
              icon={<TocIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={!collapsed ? { ml: "20px" } : { textAlign: "center" }}
            >
              Coupons
            </Typography>
            <Item
              title="Add Coupon"
              to="/admin/add-coupon"
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Coupon List"
              to="/admin/coupon-list"
              icon={<FeaturedPlayListIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidenav;
