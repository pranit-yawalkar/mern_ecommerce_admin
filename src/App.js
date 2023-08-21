import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Messages from "./pages/Messages";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import Products from "./pages/Products";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";

function App() {
  const [theme, colorMode] = useMode();
  console.log(theme, colorMode);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="messages" element={<Messages />} />
                <Route path="blog-list" element={<BlogList />} />
                <Route path="blog-cat-list" element={<BlogCatList />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="color-list" element={<ColorList />} />
                <Route path="category-list" element={<CategoryList />} />
                <Route path="brand-list" element={<BrandList />} />
                <Route path="product-list" element={<Products />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="add-blog-category" element={<AddBlogCategory />} />
                <Route
                  path="add-blog-category/:blogCatId"
                  element={<AddBlogCategory />}
                />
                <Route path="add-color" element={<AddColor />} />
                <Route path="add-category" element={<AddCategory />} />
                <Route
                  path="add-category/:categoryId"
                  element={<AddCategory />}
                />
                <Route path="add-brand" element={<AddBrand />} />
                <Route path="add-brand/:brandId" element={<AddBrand />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="add-coupon" element={<AddCoupon />} />
                <Route path="coupon-list" element={<CouponList />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    </>
  );
}

export default App;
