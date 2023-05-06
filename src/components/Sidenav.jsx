// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import { useTheme, Box, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddCardIcon from "@mui/icons-material/AddCard";
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

import { useSidebarContext } from "./SidebarContext";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      href={<Link to={to} />}
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
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
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
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Customers"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"
              to="/team"
              icon={<ReceiptLongIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messages"
              to="/team"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Catalog
            </Typography>
            <Item
              title="Add Product"
              to="/form"
              icon={<AddBusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Product List"
              to="/calendar"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Brand"
              to="/calendar"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Brand List"
              to="/calendar"
              icon={<BrandingWatermarkIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Category"
              to="/calendar"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Category List"
              to="/calendar"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Color"
              to="/calendar"
              icon={<AddToPhotosIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Color List"
              to="/calendar"
              icon={<PaletteIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Blogs
            </Typography>
            <Item
              title="Add Blog"
              to="/bar"
              icon={<PostAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Blog List"
              to="/pie"
              icon={<LibraryBooksIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Blog Category"
              to="/line"
              icon={<PlaylistAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Blog Category List"
              to="/geography"
              icon={<TocIcon />}
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
